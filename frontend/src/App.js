import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

// Import pages
import HomePage from './pages/HomePage';
import MaterialsPage from './pages/MaterialsPage';

// Define theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0097a7', // Cyan 700
      light: '#56c8d8',
      dark: '#006978',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6f00', // Amber 800
      light: '#ffa040',
      dark: '#c43e00',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 151, 167, 0.2)',
          },
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(255, 111, 0, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  },
});

// Placeholder for pages not yet implemented
const PlaceholderPage = ({ title }) => (
  <Box sx={{ 
    minHeight: '60vh', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center',
    p: 4,
  }}>
    <h1>{title}</h1>
    <p>This page is coming soon. Check back later!</p>
  </Box>
);

function App() {
  // Mock authentication state (would be implemented with proper auth system)
  const isAuthenticated = false;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/materials" element={<MaterialsPage />} />
              <Route path="/materials/:id" element={<PlaceholderPage title="Material Details" />} />
              <Route path="/compare" element={<PlaceholderPage title="Compare Materials" />} />
              <Route path="/learn" element={<PlaceholderPage title="Learning Center" />} />
              <Route path="/about" element={<PlaceholderPage title="About EasyMatter" />} />
              <Route path="/help" element={<PlaceholderPage title="Help & Support" />} />
              <Route path="/login" element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <PlaceholderPage title="Login" />
              } />
              <Route path="/register" element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <PlaceholderPage title="Register" />
              } />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                isAuthenticated ? <PlaceholderPage title="Dashboard" /> : <Navigate to="/login" />
              } />
              <Route path="/profile" element={
                isAuthenticated ? <PlaceholderPage title="User Profile" /> : <Navigate to="/login" />
              } />
              <Route path="/settings" element={
                isAuthenticated ? <PlaceholderPage title="Settings" /> : <Navigate to="/login" />
              } />
              <Route path="/notifications" element={
                isAuthenticated ? <PlaceholderPage title="Notifications" /> : <Navigate to="/login" />
              } />
              <Route path="/notifications/settings" element={
                isAuthenticated ? <PlaceholderPage title="Notification Settings" /> : <Navigate to="/login" />
              } />
              
              {/* Fallback for undefined routes */}
              <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;