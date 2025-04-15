import React, { useRef } from 'react';
import { 
  Paper, 
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Divider
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import WarningIcon from '@mui/icons-material/Warning';

const CodeDisplay = ({ 
  code, 
  title = 'Generated Code', 
  warnings = [],
  estimatedTime = '',
  memoryRequirements = ''
}) => {
  const codeRef = useRef(null);

  // Function to copy code to clipboard
  const copyToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(code)
        .then(() => {
          alert('Code copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
          alert('Failed to copy code. Please try selecting and copying manually.');
        });
    }
  };

  // Function to download code as a Python file
  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'easymatter_mattergen_code.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Function to open code in Colab
  const openInColab = () => {
    const encodedCode = encodeURIComponent(code);
    const colabUrl = `https://colab.research.google.com/github/googlecolab/colabtools/blob/main/notebooks/colab-github-demo.ipynb?code=${encodedCode}`;
    window.open(colabUrl, '_blank');
  };

  // Simple syntax highlighting - just basic formatting for Python
  const formatCode = (code) => {
    if (!code) return '';
    
    // Split into lines for line numbers
    return code.split('\n').map((line, index) => (
      <Box key={index} sx={{ display: 'flex' }}>
        <Box 
          sx={{ 
            width: '40px', 
            color: 'text.disabled', 
            textAlign: 'right', 
            pr: 1,
            userSelect: 'none',
            borderRight: '1px solid',
            borderColor: 'divider',
            mr: 1
          }}
        >
          {index + 1}
        </Box>
        <Box component="span" sx={{ whiteSpace: 'pre-wrap' }}>
          {line}
        </Box>
      </Box>
    ));
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="h6">{title}</Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Copy code">
            <IconButton onClick={copyToClipboard} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Download as Python file">
            <IconButton onClick={downloadCode} size="small">
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Button 
            variant="contained" 
            size="small" 
            endIcon={<OpenInNewIcon />}
            onClick={openInColab}
          >
            Open in Colab
          </Button>
        </Box>
      </Box>
      
      {(warnings.length > 0 || estimatedTime || memoryRequirements) && (
        <Box 
          sx={{ 
            mb: 2, 
            p: 2, 
            bgcolor: 'rgba(255, 152, 0, 0.1)', 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'warning.light'
          }}
        >
          {warnings.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <WarningIcon color="warning" sx={{ mr: 1 }} />
              <Typography variant="subtitle2">Important Notes:</Typography>
            </Box>
          )}
          
          {warnings.length > 0 && (
            <ul style={{ margin: '8px 0', paddingLeft: '24px' }}>
              {warnings.map((warning, index) => (
                <li key={index}>
                  <Typography variant="body2">{warning}</Typography>
                </li>
              ))}
            </ul>
          )}
          
          {(estimatedTime || memoryRequirements) && (
            <Box sx={{ mt: 1 }}>
              {estimatedTime && (
                <Typography variant="body2">
                  <strong>Estimated execution time:</strong> {estimatedTime}
                </Typography>
              )}
              
              {memoryRequirements && (
                <Typography variant="body2">
                  <strong>Memory requirements:</strong> {memoryRequirements}
                </Typography>
              )}
            </Box>
          )}
        </Box>
      )}
      
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          bgcolor: '#f5f5f5',
          overflowX: 'auto',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          borderRadius: 2,
          maxHeight: '500px',
          overflow: 'auto'
        }}
        ref={codeRef}
      >
        {formatCode(code)}
      </Paper>
    </Box>
  );
};

export default CodeDisplay;