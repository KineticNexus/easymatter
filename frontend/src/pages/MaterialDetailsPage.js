import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Button,
  Divider,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import GetAppIcon from '@mui/icons-material/GetApp';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Sample Material Data (in a real app, this would come from an API)
const SAMPLE_MATERIAL = {
  id: 'mat-123',
  name: 'CH3NH3PbI3',
  description: 'Methylammonium lead iodide perovskite',
  type: 'Perovskite',
  dateCreated: '2023-10-15',
  creator: 'AI Assistant',
  isFavorite: false,
  properties: {
    bandgap: '1.55 eV',
    stability: 'Moderate',
    costRating: 'Low',
    density: '4.16 g/cm³',
    crystalSystem: 'Tetragonal',
    applications: ['Solar cells', 'Photodetectors', 'LEDs']
  },
  performance: {
    efficiencyRating: 86,
    costRating: 92,
    stabilityRating: 64,
    sustainabilityRating: 71,
    manufacturabilityRating: 79
  },
  structure: {
    unitCell: 'a = 8.85 Å, b = 8.85 Å, c = 12.64 Å',
    spaceGroup: 'I4/mcm',
    atomPositions: [
      { element: 'Pb', position: '0, 0, 0' },
      { element: 'I', position: '0, 0, 0.25' },
      { element: 'I', position: '0.5, 0, 0' },
      { element: 'C', position: '0.5, 0.5, 0.5' },
      { element: 'N', position: '0.4, 0.4, 0.5' },
    ]
  },
  similarMaterials: [
    { id: 'mat-124', name: 'CH3NH3PbBr3', similarity: 89 },
    { id: 'mat-125', name: 'CH3NH3PbCl3', similarity: 82 },
    { id: 'mat-126', name: 'HC(NH2)2PbI3', similarity: 78 }
  ]
};

// Sample MatterGen code
const SAMPLE_CODE = \`from mattergen import Dataset, MatSciGen
from mattergen.examples import get_all_docs

# Define your material requirements
requirements = {
    "composition": "CH3NH3PbI3",
    "crystal_system": "Tetragonal",
    "target_properties": {
        "bandgap": 1.55,
        "stability": "Moderate"
    }
}

# Initialize the MatSciGen model
model = MatSciGen()

# Generate material candidates
candidates = model.generate_materials(**requirements)

# Print the top candidate
print("Top material candidate:")
print(candidates[0])

# Simulate properties
properties = model.simulate_properties(candidates[0])
print("\\nPredicted properties:")
for prop, value in properties.items():
    print(f"{prop}: {value}")
\`;

const MaterialDetailsPage = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    // In a real app, fetch material data based on materialId
    // For now, we're using sample data
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMaterial(SAMPLE_MATERIAL);
      setFavorite(SAMPLE_MATERIAL.isFavorite);
      setIsLoading(false);
    };

    fetchData();
  }, [materialId]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFavoriteToggle = () => {
    setFavorite(!favorite);
    // In a real app, send update to backend
  };

  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([SAMPLE_CODE], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = \`mattergen_\${materialId}.py\`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShareMaterial = () => {
    // Implementation would depend on your sharing strategy
    navigator.clipboard.writeText(window.location.href);
    // Could show a snackbar/toast here with "Link copied to clipboard!"
  };

  const handleEditMaterial = () => {
    navigate(\`/design?material=\${materialId}\`);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading material details...
        </Typography>
      </Container>
    );
  }

  if (!material) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          Material not found
        </Typography>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header with navigation and actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {material.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton 
            color={favorite ? "primary" : "default"} 
            onClick={handleFavoriteToggle}
          >
            {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={handleShareMaterial}>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={handleEditMaterial}>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Material type and description */}
      <Box sx={{ mb: 4 }}>
        <Chip 
          label={material.type} 
          color="primary" 
          size="small" 
          sx={{ mr: 1 }}
        />
        <Typography variant="subtitle1" component="span" color="text.secondary">
          Created by {material.creator} on {new Date(material.dateCreated).toLocaleDateString()}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {material.description}
        </Typography>
      </Box>

      {/* Tabs for different sections */}
      <Box sx={{ width: '100%', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<AssessmentIcon />} label="PROPERTIES" />
          <Tab icon={<DataObjectIcon />} label="STRUCTURE" />
          <Tab icon={<CodeIcon />} label="CODE" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box sx={{ mb: 4 }}>
        {/* Properties Tab */}
        <Box hidden={tabValue !== 0}>
          <Grid container spacing={3}>
            {/* Key Properties */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Key Properties
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {Object.entries(material.properties).map(([key, value]) => (
                        key !== 'applications' && (
                          <TableRow key={key}>
                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                            </TableCell>
                            <TableCell align="right">{value}</TableCell>
                          </TableRow>
                        )
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* Performance Metrics */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Performance Metrics
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  {Object.entries(material.performance).map(([key, value]) => (
                    <Grid item xs={6} key={key}>
                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                          <CircularProgress
                            variant="determinate"
                            value={value}
                            size={80}
                            thickness={4}
                            color={value > 80 ? "success" : value > 60 ? "primary" : "warning"}
                          />
                          <Box
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: 'absolute',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography variant="body2" component="div" color="text.secondary">
                              {value}%
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {key.replace(/Rating/g, '').charAt(0).toUpperCase() + key.replace(/Rating/g, '').slice(1).replace(/([A-Z])/g, ' $1')}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Applications */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Potential Applications
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {material.properties.applications.map((app, index) => (
                    <Chip key={index} label={app} />
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Structure Tab */}
        <Box hidden={tabValue !== 1}>
          <Grid container spacing={3}>
            {/* Crystal Structure Data */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Crystal Structure
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          Unit Cell
                        </TableCell>
                        <TableCell align="right">{material.structure.unitCell}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                          Space Group
                        </TableCell>
                        <TableCell align="right">{material.structure.spaceGroup}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>

            {/* Structure Visualization Placeholder */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    3D Structure Visualization
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    (In a complete application, a 3D model of the crystal structure would be displayed here)
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Atom Positions */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Atom Positions
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Element</TableCell>
                        <TableCell>Position (x, y, z)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {material.structure.atomPositions.map((atom, index) => (
                        <TableRow key={index}>
                          <TableCell>{atom.element}</TableCell>
                          <TableCell>{atom.position}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Code Tab */}
        <Box hidden={tabValue !== 2}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                MatterGen Code
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<GetAppIcon />}
                onClick={handleDownloadCode}
              >
                Download
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box
              component="pre"
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: '#1e1e1e',
                color: '#d4d4d4',
                fontFamily: '"Fira Code", monospace',
                fontSize: '0.875rem',
                overflowX: 'auto'
              }}
            >
              <code>{SAMPLE_CODE}</code>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Similar Materials */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Similar Materials
        </Typography>
        <Grid container spacing={3}>
          {material.similarMaterials.map((similar) => (
            <Grid item xs={12} sm={6} md={4} key={similar.id}>
              <Card sx={{ cursor: 'pointer' }} onClick={() => navigate(\`/materials/\${similar.id}\`)}>
                <CardContent>
                  <Typography variant="h6">{similar.name}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Chip 
                      label={\`\${similar.similarity}% similar\`} 
                      size="small" 
                      color="primary" 
                    />
                    <Typography variant="body2" color="text.secondary">
                      View details
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/materials')}
        >
          Back to Materials
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEditMaterial}
        >
          Edit This Material
        </Button>
      </Box>
    </Container>
  );
};

export default MaterialDetailsPage;