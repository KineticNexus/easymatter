import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [materialsMenuAnchor, setMaterialsMenuAnchor] = useState(null);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  
  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleMaterialsMenuOpen = (event) => {
    setMaterialsMenuAnchor(event.currentTarget);
  };
  
  const handleMaterialsMenuClose = () => {
    setMaterialsMenuAnchor(null);
  };
  
  const handleAccountMenuOpen = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };
  
  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Materials', path: '/materials', hasMenu: true },
    { name: 'Design Tool', path: '/design' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  
  const materialsMenuItems = [
    { name: 'Browse All', path: '/materials' },
    { name: 'By Category', path: '/materials/category' },
    { name: 'New Materials', path: '/materials/new' },
    { name: 'Featured', path: '/materials/featured' }
  ];
  
  const accountMenuItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
    { name: 'My Materials', path: '/my-materials' },
    { name: 'Logout', path: '/logout' }
  ];
  
  const logo = (
    <Typography
      variant="h6"
      component={RouterLink}
      to="/"
      sx={{
        fontWeight: 700,
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      EasyMatter
    </Typography>
  );

  const desktopNav = (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
        {navItems.map((item) => (
          item.hasMenu ? (
            <Box key={item.name}>
              <Button
                onClick={handleMaterialsMenuOpen}
                endIcon={<ArrowDownIcon />}
                sx={{
                  color: 'white',
                  mx: 1,
                  textTransform: 'none',
                  borderBottom: isActive(item.path) ? '2px solid white' : 'none',
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                {item.name}
              </Button>
              <Menu
                anchorEl={materialsMenuAnchor}
                open={Boolean(materialsMenuAnchor)}
                onClose={handleMaterialsMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'materials-button',
                }}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    minWidth: 180
                  }
                }}
              >
                {materialsMenuItems.map((menuItem) => (
                  <MenuItem
                    key={menuItem.name}
                    component={RouterLink}
                    to={menuItem.path}
                    onClick={handleMaterialsMenuClose}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)'
                      }
                    }}
                  >
                    {menuItem.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button
              key={item.name}
              component={RouterLink}
              to={item.path}
              sx={{
                color: 'white',
                mx: 1,
                textTransform: 'none',
                borderBottom: isActive(item.path) ? '2px solid white' : 'none',
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              {item.name}
            </Button>
          )
        ))}
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton
          onClick={handleAccountMenuOpen}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <PersonIcon />
        </IconButton>
        <Menu
          anchorEl={accountMenuAnchor}
          open={Boolean(accountMenuAnchor)}
          onClose={handleAccountMenuClose}
          MenuListProps={{
            'aria-labelledby': 'account-button',
          }}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 180
            }
          }}
        >
          {accountMenuItems.map((menuItem) => (
            <MenuItem
              key={menuItem.name}
              component={RouterLink}
              to={menuItem.path}
              onClick={handleAccountMenuClose}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)'
                }
              }}
            >
              {menuItem.name}
            </MenuItem>
          ))}
        </Menu>
        <Button
          variant="outlined"
          color="inherit"
          sx={{
            ml: 2,
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            ml: 2
          }}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );

  const mobileDrawer = (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleMobileToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { 
          width: 240,
          boxSizing: 'border-box' 
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          EasyMatter
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <React.Fragment key={item.name}>
            <ListItem 
              button 
              component={RouterLink} 
              to={item.path}
              onClick={handleMobileToggle}
              selected={isActive(item.path)}
            >
              <ListItemText primary={item.name} />
            </ListItem>
            
            {item.hasMenu && materialsMenuItems.map((subItem) => (
              <ListItem 
                button 
                key={subItem.name}
                component={RouterLink} 
                to={subItem.path}
                onClick={handleMobileToggle}
                selected={isActive(subItem.path)}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={subItem.name} />
              </ListItem>
            ))}
          </React.Fragment>
        ))}
        
        <Box sx={{ mt: 2, mx: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/login"
            onClick={handleMobileToggle}
            sx={{ mb: 1 }}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/register"
            onClick={handleMobileToggle}
          >
            Sign Up
          </Button>
        </Box>
      </List>
    </Drawer>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: theme.palette.primary.main }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleMobileToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }}>{logo}</Box>
            </>
          ) : (
            <>
              {logo}
              {desktopNav}
            </>
          )}
        </Toolbar>
      </Container>
      {mobileDrawer}
    </AppBar>
  );
};

export default Navbar;