import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Divider,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

function MaterialsPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [page, setPage] = useState(1);

  // Mock materials data
  const materialsList = [
    {
      id: 1,
      name: 'Aluminum Alloy 6061',
      category: 'Metal',
      subcategory: 'Aluminum',
      description: 'A versatile, heat-treatable aluminum alloy containing magnesium and silicon as its major alloying elements.',
      properties: ['Lightweight', 'Corrosion Resistant', 'Heat Treatable'],
      applications: ['Aerospace', 'Automotive', 'Construction'],
      image: 'https://source.unsplash.com/random/300×200/?aluminum'
    },
    {
      id: 2,
      name: 'Carbon Fiber Reinforced Polymer',
      category: 'Composite',
      subcategory: 'Polymer Matrix',
      description: 'A strong, lightweight material consisting of carbon fibers embedded in a polymer matrix.',
      properties: ['High Strength', 'Lightweight', 'Fatigue Resistant'],
      applications: ['Aerospace', 'Automotive', 'Sports Equipment'],
      image: 'https://source.unsplash.com/random/300×200/?carbon'
    },
    {
      id: 3,
      name: 'Silicon Nitride',
      category: 'Ceramic',
      subcategory: 'Technical Ceramic',
      description: 'A high-performance technical ceramic with exceptional thermal and mechanical properties.',
      properties: ['High Temperature Stability', 'Wear Resistant', 'Low Thermal Expansion'],
      applications: ['Bearings', 'Turbine Components', 'Cutting Tools'],
      image: 'https://source.unsplash.com/random/300×200/?ceramic'
    },
    {
      id: 4,
      name: 'Polyethylene Terephthalate',
      category: 'Polymer',
      subcategory: 'Thermoplastic',
      description: 'A common thermoplastic polymer resin used in fibers for clothing, containers for liquids and foods.',
      properties: ['Recyclable', 'Chemical Resistant', 'Lightweight'],
      applications: ['Packaging', 'Textiles', 'Containers'],
      image: 'https://source.unsplash.com/random/300×200/?plastic'
    },
    {
      id: 5,
      name: 'Titanium Ti-6Al-4V',
      category: 'Metal',
      subcategory: 'Titanium',
      description: 'An alpha-beta titanium alloy with high strength-to-weight ratio and excellent corrosion resistance.',
      properties: ['Biocompatible', 'Corrosion Resistant', 'High Strength'],
      applications: ['Medical Implants', 'Aerospace', 'Marine'],
      image: 'https://source.unsplash.com/random/300×200/?titanium'
    },
    {
      id: 6,
      name: 'Graphene',
      category: 'Nanomaterial',
      subcategory: 'Carbon-based',
      description: 'A single layer of carbon atoms arranged in a two-dimensional honeycomb lattice.',
      properties: ['Electrically Conductive', 'Thermally Conductive', 'Mechanically Strong'],
      applications: ['Electronics', 'Energy Storage', 'Composites'],
      image: 'https://source.unsplash.com/random/300×200/?graphene'
    },
    {
      id: 7,
      name: 'Silicon Carbide',
      category: 'Ceramic',
      subcategory: 'Technical Ceramic',
      description: 'A semiconductor material with high thermal conductivity and mechanical durability.',
      properties: ['High Temperature Resistant', 'Wear Resistant', 'Semiconductor'],
      applications: ['Power Electronics', 'Abrasives', 'Automotive'],
      image: 'https://source.unsplash.com/random/300×200/?carbide'
    },
    {
      id: 8,
      name: 'Kevlar',
      category: 'Polymer',
      subcategory: 'Aramid Fiber',
      description: 'A heat-resistant and strong synthetic fiber used in armor, bicycle tires, and other applications.',
      properties: ['High Tensile Strength', 'Heat Resistant', 'Lightweight'],
      applications: ['Ballistic Protection', 'Aerospace', 'Sporting Goods'],
      image: 'https://source.unsplash.com/random/300×200/?kevlar'
    },
    {
      id: 9,
      name: 'Borosilicate Glass',
      category: 'Glass',
      subcategory: 'Technical Glass',
      description: 'A type of glass with silica and boron trioxide as the main components, known for low thermal expansion.',
      properties: ['Thermal Shock Resistant', 'Chemical Resistant', 'Optically Clear'],
      applications: ['Laboratory Equipment', 'Cookware', 'Lighting'],
      image: 'https://source.unsplash.com/random/300×200/?glass'
    }
  ];

  // Filter materials based on search and filters
  const filteredMaterials = materialsList.filter(material => {
    // Search query filter
    const matchesSearch = searchQuery === '' || 
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.properties.some(prop => prop.toLowerCase().includes(searchQuery.toLowerCase())) ||
      material.applications.some(app => app.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = category === 'all' || material.category === category;
    
    return matchesSearch && matchesCategory;
  });

  // Sort materials
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    // Default: relevance (no specific sort)
    return 0;
  });

  // Pagination
  const materialsPerPage = 6;
  const totalPages = Math.ceil(sortedMaterials.length / materialsPerPage);
  const displayedMaterials = sortedMaterials.slice(
    (page - 1) * materialsPerPage, 
    page * materialsPerPage
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
    // Scroll to top of materials section
    document.getElementById('materials-grid').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Material Database
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Explore our comprehensive database of materials. Use the filters and search to find the perfect material for your application.
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Box 
        sx={{ 
          mb: 4, 
          p: 3, 
          bgcolor: 'background.paper', 
          borderRadius: 1,
          boxShadow: 1
        }}
      >
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Materials"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search by name, property, or application"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FilterListIcon fontSize="small" sx={{ mr: 1 }} />
                  Category
                </Box>
              </InputLabel>
              <Select
                labelId="category-label"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Metal">Metals</MenuItem>
                <MenuItem value="Polymer">Polymers</MenuItem>
                <MenuItem value="Ceramic">Ceramics</MenuItem>
                <MenuItem value="Composite">Composites</MenuItem>
                <MenuItem value="Nanomaterial">Nanomaterials</MenuItem>
                <MenuItem value="Glass">Glass</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="sort-label">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SortIcon fontSize="small" sx={{ mr: 1 }} />
                  Sort By
                </Box>
              </InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="relevance">Relevance</MenuItem>
                <MenuItem value="name-asc">Name (A-Z)</MenuItem>
                <MenuItem value="name-desc">Name (Z-A)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Results Info */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {filteredMaterials.length} materials found
          {searchQuery && ` for "${searchQuery}"`}
          {category !== 'all' && ` in ${category}`}
        </Typography>
        {(searchQuery || category !== 'all') && (
          <Button 
            size="small" 
            onClick={() => {
              setSearchQuery('');
              setCategory('all');
              setSortBy('relevance');
            }}
          >
            Clear Filters
          </Button>
        )}
      </Box>

      {/* Materials Grid */}
      <div id="materials-grid">
        {displayedMaterials.length > 0 ? (
          <Grid container spacing={4}>
            {displayedMaterials.map((material) => (
              <Grid item key={material.id} xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={material.image}
                    alt={material.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {material.name}
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Chip 
                        size="small" 
                        label={material.category} 
                        color="primary" 
                        variant="outlined" 
                        sx={{ mr: 1, mb: 1 }}
                      />
                      <Chip 
                        size="small" 
                        label={material.subcategory} 
                        color="secondary" 
                        variant="outlined" 
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {material.description}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Key Properties:
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      {material.properties.map((prop, index) => (
                        <Chip 
                          key={index} 
                          label={prop} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Applications:
                    </Typography>
                    <Stack direction="row" flexWrap="wrap">
                      {material.applications.map((app, index) => (
                        <Chip 
                          key={index} 
                          label={app} 
                          size="small" 
                          variant="outlined"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={RouterLink} 
                      to={`/materials/${material.id}`}
                    >
                      View Details
                    </Button>
                    <Button size="small">Compare</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 1
          }}>
            <Typography variant="h6" gutterBottom>
              No materials found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters to find what you're looking for.
            </Typography>
          </Box>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
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
}

export default MaterialsPage;