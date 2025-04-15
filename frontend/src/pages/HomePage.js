import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Paper,
  Card,
  CardContent,
  CardActions,
  CardMedia
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StorageIcon from '@mui/icons-material/Storage';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: { xs: 4, md: 8 },
          mb: 6
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' }
          }}
        >
          <Box component="span" sx={{ color: 'primary.main' }}>Easy</Box>Matter
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          color="text.secondary"
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto', 
            mb: 4,
            px: 2
          }}
        >
          Making MatterGen accessible to non-scientists for designing materials
          with a chat-based UI
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2,
            flexWrap: 'wrap'
          }}
        >
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/design')}
            startIcon={<DesignServicesIcon />}
          >
            Start Designing
          </Button>
          
          <Button 
            variant="outlined" 
            size="large" 
            onClick={() => navigate('/materials')}
            startIcon={<StorageIcon />}
          >
            Browse Materials
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ 
            mb: 4, 
            textAlign: 'center',
            fontWeight: 600
          }}
        >
          Key Features
        </Typography>
        
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} md={4}>
            <Card 
              className="material-card"
              sx={{ height: '100%' }}
            >
              <CardMedia
                sx={{ 
                  height: 140, 
                  bgcolor: 'primary.main', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <DesignServicesIcon sx={{ fontSize: 64, color: 'white' }} />
              </CardMedia>
              
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Intuitive Design Interface
                </Typography>
                <Typography variant="body1">
                  Design new materials by describing your requirements in plain English. 
                  Our AI-powered chat interface converts your specifications into MatterGen code.
                </Typography>
              </CardContent>
              
              <CardActions>
                <Button size="small" onClick={() => navigate('/design')}>
                  Start Designing
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          {/* Feature 2 */}
          <Grid item xs={12} md={4}>
            <Card 
              className="material-card"
              sx={{ height: '100%' }}
            >
              <CardMedia
                sx={{ 
                  height: 140, 
                  bgcolor: 'secondary.main', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ScienceIcon sx={{ fontSize: 64, color: 'white' }} />
              </CardMedia>
              
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Materials Database
                </Typography>
                <Typography variant="body1">
                  Browse our curated database of materials with detailed properties, 
                  costs, and availability information. Import your own datasets for analysis.
                </Typography>
              </CardContent>
              
              <CardActions>
                <Button size="small" onClick={() => navigate('/materials')}>
                  Explore Materials
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          {/* Feature 3 */}
          <Grid item xs={12} md={4}>
            <Card 
              className="material-card"
              sx={{ height: '100%' }}
            >
              <CardMedia
                sx={{ 
                  height: 140, 
                  bgcolor: 'info.main', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <DataObjectIcon sx={{ fontSize: 64, color: 'white' }} />
              </CardMedia>
              
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Google Colab Integration
                </Typography>
                <Typography variant="body1">
                  Seamlessly export your material designs to Google Colab notebooks 
                  for advanced simulations and analysis using MatterGen's powerful capabilities.
                </Typography>
              </CardContent>
              
              <CardActions>
                <Button size="small" onClick={() => navigate('/colab-code')}>
                  Generate Colab Code
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ 
            mb: 4, 
            textAlign: 'center',
            fontWeight: 600
          }}
        >
          How It Works
        </Typography>
        
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            bgcolor: 'background.paper' 
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  1. Describe Your Material Requirements
                </Typography>
                <Typography variant="body1" paragraph>
                  Use our chat interface to describe what you need in your material - 
                  properties, cost constraints, elements to include or avoid.
                </Typography>
                
                <Typography variant="h6" gutterBottom>
                  2. Review and Refine
                </Typography>
                <Typography variant="body1" paragraph>
                  Our AI interprets your requirements and proposes material designs. 
                  Review and refine the properties interactively.
                </Typography>
                
                <Typography variant="h6" gutterBottom>
                  3. Generate MatterGen Code
                </Typography>
                <Typography variant="body1" paragraph>
                  When you're happy with the design, generate ready-to-use MatterGen code 
                  that you can run directly in Google Colab.
                </Typography>
                
                <Typography variant="h6" gutterBottom>
                  4. Run Simulations or Export Results
                </Typography>
                <Typography variant="body1">
                  Open the generated code in Colab to run simulations, or export your 
                  material designs for use in other applications.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <img 
                  src="https://raw.githubusercontent.com/microsoft/mattergen/main/docs/images/mattergen.png" 
                  alt="MatterGen process visualization" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '400px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                  }} 
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Call to Action */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 6,
          mb: 4,
          bgcolor: 'primary.light',
          borderRadius: 2,
          color: 'white'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Ready to design your next material?
        </Typography>
        
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          Start designing now and harness the power of MatterGen through our user-friendly interface.
        </Typography>
        
        <Button 
          variant="contained" 
          size="large" 
          color="secondary"
          onClick={() => navigate('/design')}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;