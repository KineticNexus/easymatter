import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Our Team', path: '/team' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
        { name: 'Contact Us', path: '/contact' }
      ]
    },
    {
      title: 'Materials',
      links: [
        { name: 'Browse Materials', path: '/materials' },
        { name: 'Categories', path: '/materials/category' },
        { name: 'Featured', path: '/materials/featured' },
        { name: 'New Materials', path: '/materials/new' },
        { name: 'Submit Material', path: '/materials/submit' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Design Tool', path: '/design' },
        { name: 'Material Analysis', path: '/analysis' },
        { name: 'Consulting', path: '/consulting' },
        { name: 'Workshops', path: '/workshops' },
        { name: 'API Access', path: '/api' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Guides', path: '/guides' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Documentation', path: '/docs' },
        { name: 'FAQ', path: '/faq' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com' },
    { icon: <TwitterIcon />, url: 'https://twitter.com' },
    { icon: <InstagramIcon />, url: 'https://instagram.com' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com' },
    { icon: <YouTubeIcon />, url: 'https://youtube.com' }
  ];

  const legalLinks = [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'Accessibility', path: '/accessibility' }
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: theme.palette.primary.dark,
        color: 'white',
        pt: 6,
        pb: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {footerSections.map((section) => (
            <Grid item xs={12} sm={6} md={3} key={section.title}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 1 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      underline="hover"
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': {
                          color: 'white'
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3
            }}
          >
            <Box sx={{ mb: { xs: 2, md: 0 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                EasyMatter
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
                Simplifying material selection and design.
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social, index) => (
                <IconButton 
                  key={index} 
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3
            }}
          >
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              © {year} EasyMatter. All rights reserved.
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 3 }}
              sx={{ mt: { xs: 2, md: 0 } }}
            >
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  to={link.path}
                  underline="hover"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'white'
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;