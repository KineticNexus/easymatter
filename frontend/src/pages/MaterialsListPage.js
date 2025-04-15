import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Chip,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  CircularProgress,
  Backdrop,
  Alert,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Sample materials data
const SAMPLE_MATERIALS = [
  {
    id: 'mat-123',
    name: 'CH3NH3PbI3',
    description: 'Methylammonium lead iodide perovskite',
    type: 'Perovskite',
    dateCreated: '2023-10-15',
    properties: {
      bandgap: '1.55 eV',
      stability: 'Moderate',
      applications: ['Solar cells', 'Photodetectors']
    },
    isFavorite: true
  },
  {
    id: 'mat-124',
    name: 'BiFeO3',
    description: 'Bismuth ferrite multiferroic',
    type: 'Perovskite Oxide',
    dateCreated: '2023-09-22',
    properties: {
      bandgap: '2.3 eV',
      stability: 'High',
      applications: ['Memory devices', 'Spintronics']
    },
    isFavorite: false
  },
  {
    id: 'mat-125',
    name: 'Ti3C2',
    description: 'Titanium carbide MXene',
    type: 'MXene',
    dateCreated: '2023-11-05',
    properties: {
      bandgap: '0 eV (metallic)',
      stability: 'Moderate',
      applications: ['Supercapacitors', 'EMI shielding']
    },
    isFavorite: false
  },
  {
    id: 'mat-126',
    name: 'LiCoO2',
    description: 'Lithium cobalt oxide',
    type: 'Layered Oxide',
    dateCreated: '2023-08-30',
    properties: {
      bandgap: '2.1 eV',
      stability: 'High',
      applications: ['Li-ion batteries', 'Electrochemical devices']
    },
    isFavorite: true
  },
  {
    id: 'mat-127',
    name: 'Cu2ZnSnS4',
    description: 'Copper zinc tin sulfide',
    type: 'Quaternary Chalcogenide',
    dateCreated: '2023-10-08',
    properties: {
      bandgap: '1.4 eV',
      stability: 'High',
      applications: ['Solar cells', 'Photovoltaics']
    },
    isFavorite: false
  },
  {
    id: 'mat-128',
    name: 'CsPbBr3',
    description: 'Cesium lead bromide perovskite',
    type: 'Perovskite',
    dateCreated: '2023-11-12',
    properties: {
      bandgap: '2.3 eV',
      stability: 'Low',
      applications: ['LEDs', 'Photodetectors']
    },
    isFavorite: false
  },
  {
    id: 'mat-129',
    name: 'MoS2',
    description: 'Molybdenum disulfide',
    type: '2D Transition Metal Dichalcogenide',
    dateCreated: '2023-09-18',
    properties: {
      bandgap: '1.8 eV (monolayer)',
      stability: 'High',
      applications: ['Transistors', 'Sensors', 'Catalysis']
    },
    isFavorite: true
  },
  {
    id: 'mat-130',
    name: 'GaAs',
    description: 'Gallium arsenide semiconductor',
    type: 'III-V Semiconductor',
    dateCreated: '2023-10-25',
    properties: {
      bandgap: '1.42 eV',
      stability: 'High',
      applications: ['High-speed electronics', 'Photovoltaics']
    },
    isFavorite: false
  }
];

// Material type options for filter
const MATERIAL_TYPES = [
  'All Types',
  'Perovskite',
  'Perovskite Oxide',
  'MXene',
  'Layered Oxide',
  'Quaternary Chalcogenide',
  '2D Transition Metal Dichalcogenide',
  'III-V Semiconductor'
];

// Sort options
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'nameAsc', label: 'Name (A-Z)' },
  { value: 'nameDesc', label: 'Name (Z-A)' }
];

const MaterialsListPage = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [materialType, setMaterialType] = useState('All Types');
  const [sortBy, setSortBy] = useState('newest');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    // In a real app, fetch materials from API
    const fetchMaterials = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMaterials(SAMPLE_MATERIALS);
        setFilteredMaterials(SAMPLE_MATERIALS);
        setLoading(false);
      } catch (err) {
        setError('Failed to load materials. Please try again later.');
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...materials];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        material =>
          material.name.toLowerCase().includes(query) ||
          material.description.toLowerCase().includes(query) ||
          material.properties.applications.some(app => 
            app.toLowerCase().includes(query)
          )
      );
    }

    // Filter by material type
    if (materialType !== 'All Types') {
      result = result.filter(material => material.type === materialType);
    }

    // Filter favorites
    if (showOnlyFavorites) {
      result = result.filter(material => material.isFavorite);
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
        break;
      case 'nameAsc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredMaterials(result);
    setPage(1); // Reset to first page when filters change
  }, [materials, searchQuery, materialType, sortBy, showOnlyFavorites]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMaterialTypeChange = (event) => {
    setMaterialType(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const toggleFavorite = (id) => {
    const updatedMaterials = materials.map(material => 
      material.id === id 
        ? { ...material, isFavorite: !material.isFavorite } 
        : material
    );
    setMaterials(updatedMaterials);
    // In a real app, send update to backend
  };

  const toggleFavoritesFilter = () => {
    setShowOnlyFavorites(!showOnlyFavorites);
  };

  // Pagination calculations
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMaterials = filteredMaterials.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredMaterials.length / itemsPerPage);

  if (loading) {
    return (
      <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2, color: 'white' }}>
            Loading materials...
          </Typography>
        </Box>
      </Backdrop>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Materials Library
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/design')}
        >
          Create New Material
        </Button>
      </Box>

      {/* Search and Filters */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search materials..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="material-type-label">
                <FilterListIcon sx={{ mr: 1, fontSize: '1rem', verticalAlign: 'middle' }} />
                Filter by Type
              </InputLabel>
              <Select
                labelId="material-type-label"
                value={materialType}
                label={
                  <>
                    <FilterListIcon sx={{ mr: 1, fontSize: '1rem', verticalAlign: 'middle' }} />
                    Filter by Type
                  </>
                }
                onChange={handleMaterialTypeChange}
              >
                {MATERIAL_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="sort-by-label">
                <SortIcon sx={{ mr: 1, fontSize: '1rem', verticalAlign: 'middle' }} />
                Sort By
              </InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortBy}
                label={
                  <>
                    <SortIcon sx={{ mr: 1, fontSize: '1rem', verticalAlign: 'middle' }} />
                    Sort By
                  </>
                }
                onChange={handleSortChange}
              >
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant={showOnlyFavorites ? "contained" : "outlined"}
              color={showOnlyFavorites ? "primary" : "inherit"}
              startIcon={showOnlyFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={toggleFavoritesFilter}
            >
              Favorites
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Results info */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredMaterials.length > 0 ? startIndex + 1 : 0}-
          {Math.min(endIndex, filteredMaterials.length)} of {filteredMaterials.length} materials
        </Typography>
        
        {filteredMaterials.length === 0 && !loading && (
          <Typography variant="body2" color="error">
            No materials found for your search criteria
          </Typography>
        )}
      </Box>

      {/* Error message if needed */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Materials Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {paginatedMaterials.map((material) => (
          <Grid item xs={12} sm={6} md={4} key={material.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {material.name}
                  </Typography>
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(material.id);
                    }}
                    color={material.isFavorite ? "primary" : "default"}
                    sx={{ p: 0.5 }}
                  >
                    {material.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>
                
                <Chip 
                  label={material.type} 
                  size="small" 
                  sx={{ mb: 1 }}
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {material.description}
                </Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                    Bandgap:
                  </Typography>{' '}
                  <Typography variant="body2" component="span">
                    {material.properties.bandgap}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                    Stability:
                  </Typography>{' '}
                  <Typography variant="body2" component="span">
                    {material.properties.stability}
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    Applications:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {material.properties.applications.map((app, index) => (
                      <Chip key={index} label={app} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>
              </CardContent>
              
              <Divider />
              
              <CardActions>
                <Button 
                  size="small" 
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate(\`/materials/\${material.id}\`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={pageCount} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
            showFirstButton 
            showLastButton
          />
        </Box>
      )}
    </Container>
  );
};

export default MaterialsListPage;