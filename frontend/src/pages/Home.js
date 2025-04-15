import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  Category as CategoryIcon,
  Science as ScienceIcon,
  Engineering as EngineeringIcon,
  DesignServices as DesignIcon,
  EmojiObjects as IdeaIcon
} from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <SearchIcon fontSize="large" />,
      title: 'Material Search',
      description: 'Find the perfect material for your project with our advanced search tools.'
    },
    {
      icon: <CategoryIcon fontSize="large" />,
      title: 'Categorized Database',
      description: 'Browse materials by category, properties, or application.'
    },
    {
      icon: <ScienceIcon fontSize="large" />,
      title: 'Property Analysis',
      description: 'Compare material properties with detailed specifications and data.'
    },
    {
      icon: <EngineeringIcon fontSize="large" />,
      title: 'Engineering Tools',
      description: 'Calculate performance and simulate material behavior for your designs.'
    },
    {
      icon: <DesignIcon fontSize="large" />,
      title: 'Design Integration',
      description: 'Seamlessly integrate material selections into your CAD software.'
    },
    {
      icon: <IdeaIcon fontSize="large" />,
      title: 'Innovation Insights',
      description: 'Discover emerging materials and technologies for future projects.'
    }
  ];

  const featuredMaterials = [
    {
      id: 1,
      name: 'Carbon Fiber Composite',
      category: 'Composites',
      image: 'https://images.unsplash.com/photo-1544534566-9f307a5a2886?auto=format&fit=crop&w=400',
      description: 'High-strength, lightweight material for aerospace and automotive applications.'
    },
    {
      id: 2,
      name: 'Biodegradable Polymer',
      category: 'Polymers',
      image: 'https://images.unsplash.com/photo-1604754742629-3e0498a8211f?auto=format&fit=crop&w=400',
      description: 'Eco-friendly plastic alternative for sustainable product design.'
    },
    {
      id: 3,
      name: 'Titanium Alloy',
      category: 'Metals',
      image: 'https://images.unsplash.com/photo-1535813547-99c1e1c80f6e?auto=format&fit=crop&w=400',
      description: 'Corrosion-resistant metal with exceptional strength-to-weight ratio.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 10, md: 16 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 3
            }}
          >
            Material Selection Made Easy
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 5,
              opacity: 0.9
            }}
          >
            Find the perfect materials for your design and engineering projects
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={RouterLink}
              to="/materials"
              variant="contained"
              size="large"
              color="primary"
              sx={{
                fontSize: '1.1rem',
                py: 1.5,
                px: 4
              }}
            >
              Browse Materials
            </Button>
            <Button
              component={RouterLink}
              to="/design"
              variant="outlined"
              size="large"
              sx={{
                fontSize: '1.1rem',
                py: 1.5,
                px: 4,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Try Design Tool
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" component="h2" gutterBottom>
              Our Features
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              EasyMatter provides comprehensive tools to simplify your material selection process
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-5px)',
                      borderColor: 'transparent'
                    }
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      color: theme.palette.primary.main
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Materials Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" component="h2" gutterBottom>
              Featured Materials
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Discover innovative materials that can transform your next project
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {featuredMaterials.map((material) => (
              <Grid item xs={12} md={4} key={material.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 8,
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={material.image}
                    alt={material.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="overline"
                      color="primary"
                    >
                      {material.category}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                    >
                      {material.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {material.description}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to={`/materials/${material.id}`}
                      color="primary"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center" mt={6}>
            <Button
              component={RouterLink}
              to="/materials"
              variant="contained"
              color="primary"
              size="large"
            >
              View All Materials
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of engineers and designers who have simplified their material selection process
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={RouterLink}
              to="/signup"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)'
                }
              }}
            >
              Sign Up Free
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Contact Sales
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;