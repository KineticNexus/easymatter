import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import DesignPage from './pages/DesignPage';
import MaterialsPage from './pages/MaterialsPage';
import TemplatesPage from './pages/TemplatesPage';
import ColabCodePage from './pages/ColabCodePage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: darkMode ? 'grey.900' : 'background.default',
        color: darkMode ? 'common.white' : 'common.black'
      }}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <Box sx={{ flexGrow: 1, py: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/design" element={<DesignPage />} />
          <Route path="/design/:templateId" element={<DesignPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/colab-code" element={<ColabCodePage />} />
        </Routes>
      </Box>
      
      <Footer />
    </Box>
  );
}

export default App;