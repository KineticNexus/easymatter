import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom>
              EasyMatter
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Simplifying materials science and engineering for researchers,
              engineers, and students. Access cutting-edge tools for materials
              design, analysis, and applications.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="facebook" size="small">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="twitter" size="small">
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="linkedin" size="small">
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="github" size="small">
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Explore
            </Typography>
            <Link component={RouterLink} to="/materials" color="inherit" display="block" sx={{ mb: 1 }}>
              Materials
            </Link>
            <Link component={RouterLink} to="/design" color="inherit" display="block" sx={{ mb: 1 }}>
              Design Tools
            </Link>
            <Link component={RouterLink} to="/applications" color="inherit" display="block" sx={{ mb: 1 }}>
              Applications
            </Link>
            <Link component={RouterLink} to="/research" color="inherit" display="block" sx={{ mb: 1 }}>
              Research
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Link component={RouterLink} to="/documentation" color="inherit" display="block" sx={{ mb: 1 }}>
              Documentation
            </Link>
            <Link component={RouterLink} to="/tutorials" color="inherit" display="block" sx={{ mb: 1 }}>
              Tutorials
            </Link>
            <Link component={RouterLink} to="/blog" color="inherit" display="block" sx={{ mb: 1 }}>
              Blog
            </Link>
            <Link component={RouterLink} to="/faq" color="inherit" display="block" sx={{ mb: 1 }}>
              FAQ
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Have questions or suggestions? We'd love to hear from you!
            </Typography>
            <Link component={RouterLink} to="/contact" color="primary" sx={{ fontWeight: 'medium' }}>
              Get in touch
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} EasyMatter. All rights reserved.
          </Typography>
          <Box>
            <Link component={RouterLink} to="/privacy" color="inherit" sx={{ mr: 2 }}>
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;