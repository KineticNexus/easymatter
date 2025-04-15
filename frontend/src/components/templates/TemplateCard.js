import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Box, 
  Chip,
  CardMedia
} from '@mui/material';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FlaskIcon from '@mui/icons-material/Science';
import BuildIcon from '@mui/icons-material/Build';
import { useNavigate } from 'react-router-dom';

const TemplateCard = ({ template }) => {
  const navigate = useNavigate();

  // Get icon based on template category or icon property
  const getTemplateIcon = () => {
    const iconName = template.icon?.toLowerCase() || '';
    const category = template.category?.toLowerCase() || '';
    
    if (iconName.includes('battery') || category.includes('battery') || category.includes('energy')) {
      return <BatteryFullIcon sx={{ fontSize: 40 }} />;
    } else if (iconName.includes('sun') || category.includes('solar')) {
      return <WbSunnyIcon sx={{ fontSize: 40 }} />;
    } else if (iconName.includes('flask') || category.includes('chemistry') || category.includes('catalyst')) {
      return <FlaskIcon sx={{ fontSize: 40 }} />;
    } else {
      return <BuildIcon sx={{ fontSize: 40 }} />;
    }
  };

  // Get card color based on template category
  const getCardColor = () => {
    const category = template.category?.toLowerCase() || '';
    
    if (category.includes('energy') || category.includes('battery')) {
      return 'primary.light';
    } else if (category.includes('solar')) {
      return 'warning.light';
    } else if (category.includes('chemistry') || category.includes('catalyst')) {
      return 'secondary.light';
    } else if (category.includes('construction') || category.includes('structural')) {
      return 'info.light';
    } else {
      return 'grey.200';
    }
  };

  // Count total properties
  const propertiesCount = template.default_properties?.length || 0;

  return (
    <Card 
      className="material-card"
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <CardMedia
        sx={{ 
          height: 60, 
          bgcolor: getCardColor(),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}
      >
        {getTemplateIcon()}
      </CardMedia>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {template.display_name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 2 }}
        >
          {template.description}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={template.category} 
            size="small" 
            color="primary" 
            variant="outlined" 
          />
          
          <Chip 
            label={`${propertiesCount} Properties`} 
            size="small" 
            color="default" 
            variant="outlined" 
          />
          
          {template.suggested_elements && template.suggested_elements.length > 0 && (
            <Chip 
              label={`${template.suggested_elements.length} Elements`} 
              size="small" 
              color="default" 
              variant="outlined" 
            />
          )}
        </Box>
        
        {template.default_properties && template.default_properties.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary" fontWeight="medium">
              Key Properties:
            </Typography>
            
            <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
              {template.default_properties.slice(0, 3).map((prop, index) => (
                <li key={index}>
                  <Typography variant="body2" color="text.secondary">
                    {prop.name}: {prop.value} {prop.unit}
                  </Typography>
                </li>
              ))}
              {template.default_properties.length > 3 && (
                <Typography variant="body2" color="text.secondary">
                  + {template.default_properties.length - 3} more...
                </Typography>
              )}
            </ul>
          </Box>
        )}
      </CardContent>
      
      <CardActions>
        <Button 
          size="small" 
          color="primary"
          onClick={() => navigate(`/design/${template.id}`)}
        >
          Use Template
        </Button>
        
        <Button 
          size="small"
          onClick={() => navigate(`/templates/${template.id}`)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default TemplateCard;