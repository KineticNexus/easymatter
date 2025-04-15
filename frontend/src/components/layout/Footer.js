import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              EasyMatter
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Making MatterGen accessible to non-scientists for designing materials, with a chat-based UI.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/design" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Design Materials
            </Link>
            <Link component={RouterLink} to="/materials" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Materials Database
            </Link>
            <Link component={RouterLink} to="/templates" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Templates
            </Link>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Link href="https://github.com/microsoft/mattergen" target="_blank" rel="noopener" color="inherit" sx={{ display: 'block', mb: 1 }}>
              MatterGen GitHub
            </Link>
            <Link href="https://colab.research.google.com/" target="_blank" rel="noopener" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Google Colab
            </Link>
            <Link href="https://github.com/KineticNexus/easymatter" target="_blank" rel="noopener" color="inherit" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <GitHubIcon sx={{ mr: 1, fontSize: 20 }} />
              Project Repository
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' EasyMatter. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;