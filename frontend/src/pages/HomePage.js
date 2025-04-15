import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Stack,
  Paper,
  Link,
  Divider
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

function HomePage() {
  // Feature cards data
  const features = [
    {
      icon: <ExploreIcon fontSize="large" color="primary" />,
      title: 'Material Explorer',
      description: 'Browse through our comprehensive database of materials with detailed properties and applications.'
    },
    {
      icon: <SchoolIcon fontSize="large" color="primary" />,
      title: 'Learning Resources',
      description: 'Access tutorials, guides and educational content to enhance your materials science knowledge.'
    },
    {
      icon: <ScienceIcon fontSize="large" color="primary" />,
      title: 'Research Tools',
      description: 'Utilize powerful tools designed for materials researchers and engineers to streamline your workflow.'
    },
    {
      icon: <AutoGraphIcon fontSize="large" color="primary" />,
      title: 'Data Analysis',
      description: 'Analyze material properties, compare different materials, and visualize data with interactive charts.'
    }
  ];

  // Highlighted materials data
  const materials = [
    {
      title: 'Advanced Composites',
      description: 'Explore high-performance composite materials for aerospace and automotive applications.',
      image: 'https://source.unsplash.com/random/300×200/?composite'
    },
    {
      title: 'Smart Polymers',
      description: 'Discover responsive polymers that change properties based on environmental conditions.',
      image: 'https://source.unsplash.com/random/300×200/?polymer'
    },
    {
      title: 'Nanomaterials',
      description: 'Learn about cutting-edge nanomaterials with unique properties at the nanoscale.',
      image: 'https://source.unsplash.com/random/300×200/?nanomaterial'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" gutterBottom>
                Advancing Materials Science
              </Typography>
              <Typography variant="h5" paragraph>
                Discover, analyze, and innovate with our comprehensive materials platform
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                EasyMatter provides researchers, engineers, and students with powerful tools 
                and resources to explore materials science and engineering concepts.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button 
                  variant="contained" 
                  size="large" 
                  component={RouterLink} 
                  to="/materials"
                  sx={{ 
                    bgcolor: 'background.paper', 
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'background.default',
                    }
                  }}
                >
                  Explore Materials
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  component={RouterLink} 
                  to="/about"
                  sx={{ 
                    color: 'background.paper',
                    borderColor: 'background.paper',
                    '&:hover': {
                      borderColor: 'background.default',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper 
                elevation={6}
                sx={{ 
                  p: 3, 
                  bgcolor: 'rgba(255,255,255,0.9)',
                  borderRadius: 2,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <Typography variant="h6" color="primary.main" gutterBottom>
                  Get Started Today
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Join thousands of researchers and engineers using EasyMatter to advance materials science innovation.
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  component={RouterLink} 
                  to="/register"
                  sx={{ mt: 2 }}
                >
                  Sign Up for Free
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Powerful Tools for Materials Science
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Explore our suite of tools designed to help you work with materials more effectively
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Materials Showcase */}
      <Box sx={{ bgcolor: 'background.default', py: 8, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Featured Materials
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            Discover cutting-edge materials for your next project
          </Typography>
          <Grid container spacing={4}>
            {materials.map((material, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.03)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={material.image}
                    alt={material.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {material.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {material.description}
                    </Typography>
                    <Link component={RouterLink} to={`/materials/${material.title.toLowerCase().replace(' ', '-')}`}>
                      Explore more
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'primary.light', py: 6, mb: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Transform Your Materials Research?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Join thousands of researchers, engineers, and educators using EasyMatter to advance materials science.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ 
              px: 4, 
              py: 1.5,
              bgcolor: 'primary.dark', 
              '&:hover': {
                bgcolor: 'primary.main',
              }
            }}
          >
            Get Started Today
          </Button>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          What Our Users Say
        </Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                "EasyMatter has revolutionized how we approach materials selection in our lab. The comprehensive database and analysis tools have saved us countless hours of research time."
              </Typography>
              <Typography variant="subtitle1" color="primary" fontWeight="bold">
                Dr. Sarah Chen
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Research Scientist, Materials Innovation Institute
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                "As an educator, I've found EasyMatter to be an invaluable resource for teaching materials science concepts. My students love the interactive tools and visualization capabilities."
              </Typography>
              <Typography variant="subtitle1" color="primary" fontWeight="bold">
                Prof. James Rodriguez
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Professor of Engineering, Tech University
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                "The data analysis tools in EasyMatter have helped us identify optimal materials for our aerospace applications. It's become an essential part of our R&D workflow."
              </Typography>
              <Typography variant="subtitle1" color="primary" fontWeight="bold">
                Maria Johnson
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Senior Engineer, AeroTech Innovations
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;