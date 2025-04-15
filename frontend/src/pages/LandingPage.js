import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ScienceIcon from '@mui/icons-material/Science';
import MemoryIcon from '@mui/icons-material/Memory';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LandingPage = () => {
  const navigate = useNavigate();

  // Sample testimonials
  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Materials Scientist, Stanford University',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'EasyMatter has revolutionized our research workflow. We've discovered novel battery materials in half the time it would have taken using traditional methods.'
    },
    {
      name: 'Prof. Michael Rodriguez',
      role: 'Department Chair, MIT Materials Science',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'The accuracy of the property predictions is remarkable. This platform is a game-changer for academic research and industrial applications alike.'
    },
    {
      name: 'Dr. Emma Thompson',
      role: 'R&D Director, SolarTech Industries',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      content: 'We've integrated EasyMatter into our product development pipeline and have seen a 40% reduction in time-to-market for our new solar cell materials.'
    }
  ];

  // Sample use cases
  const useCases = [
    {
      title: 'Renewable Energy Materials',
      icon: <BoltIcon fontSize="large" color="primary" />,
      description: 'Discover high-efficiency photovoltaic materials and energy storage solutions with precise property predictions.'
    },
    {
      title: 'Electronic Materials',
      icon: <MemoryIcon fontSize="large" color="primary" />,
      description: 'Design semiconductor materials with tailored electronic properties for next-generation computing devices.'
    },
    {
      title: 'Catalysts',
      icon: <ScienceIcon fontSize="large" color="primary" />,
      description: 'Accelerate the discovery of novel catalytic materials for chemical processes and environmental applications.'
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          py: { xs: 8, md: 15 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                Accelerate Material Discovery with AI
              </Typography>
              <Typography 
                variant="h5" 
                component="p" 
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Design, predict, and optimize novel materials in minutes, not months. 
                Powered by state-of-the-art machine learning algorithms.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large"
                  color="secondary"
                  startIcon={<RocketLaunchIcon />}
                  onClick={() => navigate('/design')}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      opacity: 0.9,
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                  onClick={() => navigate('/materials')}
                >
                  Explore Materials
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' }}}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=1000&auto=format&fit=crop"
                alt="Material structure visualization"
                sx={{ 
                  width: '100%', 
                  borderRadius: 4,
                  boxShadow: 10,
                  transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
                  transition: 'transform 0.5s ease-in-out',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg) scale(1.02)'
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 6, mt: -6 }}>
        <Paper elevation={4} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Grid container>
            <Grid item xs={12} md={4} sx={{ p: 4, bgcolor: 'background.paper', borderRight: { xs: 'none', md: '1px solid #e0e0e0' } }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="p" color="primary" fontWeight="bold">
                  10M+
                </Typography>
                <Typography variant="h6" component="p">
                  Materials in Database
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ p: 4, bgcolor: 'background.paper', borderRight: { xs: 'none', md: '1px solid #e0e0e0' } }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="p" color="primary" fontWeight="bold">
                  96%
                </Typography>
                <Typography variant="h6" component="p">
                  Prediction Accuracy
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ p: 4, bgcolor: 'background.paper' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" component="p" color="primary" fontWeight="bold">
                  200x
                </Typography>
                <Typography variant="h6" component="p">
                  Faster Than Experiments
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
            Powerful Features for Materials Innovation
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 2, maxWidth: 800, mx: 'auto' }}>
            Our platform combines AI, physics-based modeling, and data analytics to accelerate your materials research and development.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', borderRadius: 3, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <AutoAwesomeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                  AI-Powered Design
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Generate novel material candidates with our advanced AI algorithms trained on verified experimental data.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', borderRadius: 3, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <SpeedIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                  Rapid Prediction
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Calculate material properties in seconds instead of weeks of laboratory experiments.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', borderRadius: 3, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <StorageIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                  Extensive Database
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Access millions of materials with their properties, structures, and performance data.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', borderRadius: 3, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <EngineeringIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                  Material Optimization
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Fine-tune material properties to match your specific application requirements.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Use Cases Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
              Applications Across Industries
            </Typography>
            <Typography variant="h6" component="p" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              EasyMatter is used by researchers and companies across various sectors to accelerate innovation.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {useCases.map((useCase, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {useCase.icon}
                      <Typography variant="h5" component="h3" fontWeight="bold" sx={{ ml: 2 }}>
                        {useCase.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {useCase.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
            How EasyMatter Works
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Our streamlined process takes you from concept to new material in three simple steps.
          </Typography>
        </Box>
        
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: 0, 
            right: 0, 
            height: '4px', 
            bgcolor: 'grey.200',
            transform: 'translateY(-50%)',
            display: { xs: 'none', md: 'block' }
          }} />
          
          <Grid container spacing={4} position="relative">
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', position: 'relative' }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  position: 'relative',
                  zIndex: 2
                }}>
                  1
                </Box>
                <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                  Design Your Material
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Specify the chemical composition or target properties for your material using our intuitive interface.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', position: 'relative' }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  position: 'relative',
                  zIndex: 2
                }}>
                  2
                </Box>
                <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                  Generate & Predict
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our AI generates candidate structures and predicts their properties with high accuracy.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', position: 'relative' }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  position: 'relative',
                  zIndex: 2
                }}>
                  3
                </Box>
                <Typography variant="h5" component="h3" fontWeight="bold" sx={{ mb: 1 }}>
                  Optimize & Analyze
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Fine-tune your material designs and analyze their performance for your specific applications.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
              What Our Users Say
            </Typography>
            <Typography variant="h6" component="p" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              Researchers and engineers from leading institutions and companies trust EasyMatter.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        sx={{ width: 64, height: 64 }}
                      />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="h6" component="p" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                      "{testimonial.content}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
              Ready to Transform Your Materials Research?
            </Typography>
            <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9, maxWidth: 800, mx: 'auto' }}>
              Join thousands of researchers and engineers who are accelerating their materials discovery process with EasyMatter.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              color="secondary"
              startIcon={<LightbulbIcon />}
              onClick={() => navigate('/design')}
              sx={{ 
                px: 5, 
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              Start Designing Materials
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features List */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
              Why Choose EasyMatter?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Our platform combines cutting-edge AI with materials science expertise to deliver 
              a solution that significantly accelerates the materials discovery process.
            </Typography>
            
            <List>
              {[
                'State-of-the-art machine learning algorithms',
                'Physics-informed neural networks for accuracy',
                'Interpretable AI for transparent design decisions',
                'Integration with experimental validation workflows',
                'Continuous learning from new data',
                'Secure and private research environment'
              ].map((feature, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image="https://images.unsplash.com/photo-1581092921461-7b65dbb0db2b?q=80&w=1000&auto=format&fit=crop"
              alt="Material design interface"
              sx={{ 
                borderRadius: 4, 
                boxShadow: 6,
                maxHeight: 500,
                objectFit: 'cover'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;