import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Tooltip,
  IconButton
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const MaterialCard = ({ 
  material, 
  onSelect, 
  onRemove, 
  isSelected = false,
  detailed = false
}) => {
  // Color based on availability
  const getAvailabilityColor = (availability) => {
    const lowerAvailability = availability.toLowerCase();
    if (lowerAvailability.includes('abundant')) return 'success';
    if (lowerAvailability.includes('common')) return 'info';
    if (lowerAvailability.includes('rare')) return 'warning';
    if (lowerAvailability.includes('very rare')) return 'error';
    return 'default';
  };

  // Get cost rating
  const getCostRating = (cost) => {
    if (cost < 0.05) return '$ (Very Low)';
    if (cost < 0.5) return '$$ (Low)';
    if (cost < 5) return '$$$ (Medium)';
    if (cost < 50) return '$$$$ (High)';
    return '$$$$$ (Very High)';
  };

  return (
    <Card 
      className="material-card"
      variant="outlined" 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: isSelected ? 'action.selected' : 'background.paper',
        borderColor: isSelected ? 'primary.main' : 'divider',
        borderWidth: isSelected ? 2 : 1,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" gutterBottom>
            {material.name}
          </Typography>
          <Tooltip title="Material Information">
            <IconButton size="small">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ 
            fontFamily: 'monospace', 
            letterSpacing: 0.5 
          }}
        >
          {material.formula}
        </Typography>
        
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip 
            label={`$${material.cost.toFixed(2)}/g`} 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
          <Chip 
            label={material.availability} 
            size="small" 
            color={getAvailabilityColor(material.availability)} 
          />
        </Box>
        
        {detailed && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Cost Rating:</strong> {getCostRating(material.cost)}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>Elements:</strong> {material.elements.join(', ')}
            </Typography>
            
            {material.properties && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Properties:</strong>
                </Typography>
                <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                  {Object.entries(material.properties).map(([key, value]) => (
                    <li key={key}>
                      <Typography variant="body2" color="text.secondary">
                        {key}: {value}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
      
      <CardActions>
        {onSelect && !isSelected && (
          <Button 
            size="small" 
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => onSelect(material)}
            color="primary"
          >
            Select
          </Button>
        )}
        
        {onRemove && isSelected && (
          <Button 
            size="small" 
            startIcon={<RemoveCircleOutlineIcon />}
            onClick={() => onRemove(material)}
            color="error"
          >
            Remove
          </Button>
        )}
        
        {detailed && (
          <Button 
            size="small" 
            onClick={() => window.open(`https://materialsproject.org/materials?formula=${material.formula}`, '_blank')}
            sx={{ ml: 'auto' }}
          >
            Learn More
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MaterialCard;