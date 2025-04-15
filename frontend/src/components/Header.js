import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ScienceIcon from '@mui/icons-material/Science';
import CompareIcon from '@mui/icons-material/Compare';
import SchoolIcon from '@mui/icons-material/School';
import HelpIcon from '@mui/icons-material/Help';

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { pathname } = useLocation();
  
  // State for mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // State for user menu
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const userMenuOpen = Boolean(userMenuAnchor);
  
  // State for notifications menu
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const notificationsOpen = Boolean(notificationsAnchor);

  // Mock authentication state (would be replaced with actual auth logic)
  const isAuthenticated = true;
  
  // Mock user data (would be replaced with actual user data)
  const user = {
    name: 'Alex Johnson',
    avatar: null, // URL to avatar image if available
    notifications: 3
  };

  // Navigation links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Materials', path: '/materials' },
    { title: 'Compare', path: '/compare' },
    { title: 'Learn', path: '/learn' },
    { title: 'About', path: '/about' }
  ];

  // Handle opening the mobile drawer
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle opening the user menu
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  // Handle closing the user menu
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  // Handle opening the notifications menu
  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  // Handle closing the notifications menu
  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  // User menu items with icons
  const userMenuItems = [
    { icon: <PersonIcon fontSize="small" />, text: 'Profile', path: '/profile' },
    { icon: <DashboardIcon fontSize="small" />, text: 'Dashboard', path: '/dashboard' },
    { icon: <SettingsIcon fontSize="small" />, text: 'Settings', path: '/settings' },
    { divider: true },
    { icon: <LogoutIcon fontSize="small" />, text: 'Logout', path: '/logout' }
  ];

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 280, pt: 2, pb: 4 }} role="presentation">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
          EasyMatter
        </Typography>
        <IconButton onClick={handleDrawerToggle} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={item.path}
              selected={pathname === item.path}
              onClick={handleDrawerToggle}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 151, 167, 0.12)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 151, 167, 0.20)',
                  },
                },
              }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, mb: 1 }}>
        Resources
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/materials" onClick={handleDrawerToggle}>
            <ListItemIcon><ScienceIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Materials Database" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/compare" onClick={handleDrawerToggle}>
            <ListItemIcon><CompareIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Compare Materials" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/learn" onClick={handleDrawerToggle}>
            <ListItemIcon><SchoolIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Learning Center" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/help" onClick={handleDrawerToggle}>
            <ListItemIcon><HelpIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Help & Support" />
          </ListItemButton>
        </ListItem>
      </List>
      {isAuthenticated && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                mr: 1,
                bgcolor: 'primary.main'
              }}
            >
              {user.avatar ? null : user.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                View Profile
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );

  // Notifications menu
  const notificationsMenu = (
    <Menu
      anchorEl={notificationsAnchor}
      open={notificationsOpen}
      onClose={handleNotificationsClose}
      PaperProps={{
        elevation: 3,
        sx: { 
          width: 320,
          maxHeight: 400,
          mt: 1.5
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight="medium">
          Notifications
        </Typography>
        <Link 
          component={RouterLink} 
          to="/notifications"
          underline="none"
          sx={{ fontSize: 14 }}
          onClick={handleNotificationsClose}
        >
          View All
        </Link>
      </Box>
      <Divider />
      {/* Sample notifications */}
      <MenuItem onClick={handleNotificationsClose} sx={{ py: 1.5 }}>
        <Box>
          <Typography variant="body2" fontWeight="medium">
            New Materials Added
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            5 new materials have been added to the database
          </Typography>
          <Typography variant="caption" color="text.disabled">
            2 hours ago
          </Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleNotificationsClose} sx={{ py: 1.5 }}>
        <Box>
          <Typography variant="body2" fontWeight="medium">
            Your Download is Ready
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            The material data you requested is ready for download
          </Typography>
          <Typography variant="caption" color="text.disabled">
            1 day ago
          </Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleNotificationsClose} sx={{ py: 1.5 }}>
        <Box>
          <Typography variant="body2" fontWeight="medium">
            System Update
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            New features have been added to the material comparison tool
          </Typography>
          <Typography variant="caption" color="text.disabled">
            3 days ago
          </Typography>
        </Box>
      </MenuItem>
      <Divider />
      <Box sx={{ p: 1.5, textAlign: 'center' }}>
        <Button 
          size="small" 
          color="inherit"
          component={RouterLink}
          to="/notifications/settings"
          onClick={handleNotificationsClose}
        >
          Notification Settings
        </Button>
      </Box>
    </Menu>
  );

  // User profile menu
  const userMenu = (
    <Menu
      anchorEl={userMenuAnchor}
      open={userMenuOpen}
      onClose={handleUserMenuClose}
      PaperProps={{
        elevation: 3,
        sx: { width: 220, mt: 1.5 },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
        <Typography variant="subtitle1" fontWeight="medium">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Researcher
        </Typography>
      </Box>
      <Divider />
      {userMenuItems.map((item, index) => (
        item.divider ? (
          <Divider key={`divider-${index}`} />
        ) : (
          <MenuItem 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            onClick={handleUserMenuClose}
            sx={{ py: 1 }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        )
      ))}
    </Menu>
  );

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 64 }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 4,
              display: 'flex',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'primary.main',
              textDecoration: 'none',
              alignItems: 'center'
            }}
          >
            <ScienceIcon sx={{ mr: 1 }} />
            EasyMatter
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
              {navLinks.map((link) => (
                <Button
                  component={RouterLink}
                  to={link.path}
                  key={link.title}
                  sx={{
                    my: 2,
                    color: 'text.primary',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: pathname === link.path ? '100%' : '0%',
                      height: '2px',
                      bottom: 0,
                      left: 0,
                      bgcolor: 'primary.main',
                      transition: 'width 0.3s'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  {link.title}
                </Button>
              ))}
            </Stack>
          )}

          {/* Actions */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {/* Login/Register or User Menu */}
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Tooltip title="Notifications">
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleNotificationsOpen}
                    sx={{ mr: 1 }}
                  >
                    <Badge badgeContent={user.notifications} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                {notificationsMenu}
                
                {/* User Menu */}
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleUserMenuOpen}
                    sx={{ ml: 1 }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: 'primary.main'
                      }}
                    >
                      {user.avatar ? null : user.name.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                {userMenu}
              </>
            ) : (
              <>
                <Button 
                  component={RouterLink} 
                  to="/login"
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  Sign In
                </Button>
                <Button 
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <IconButton
                size="large"
                onClick={handleDrawerToggle}
                color="inherit"
                edge="end"
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Header;