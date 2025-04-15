import React, { useState, useRef, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper,
  Grid,
  Divider,
  CircularProgress,
  IconButton,
  Tabs,
  Tab,
  Chip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoIcon from '@mui/icons-material/Info';
import TuneIcon from '@mui/icons-material/Tune';
import DeleteIcon from '@mui/icons-material/Delete';

// Dummy data for initial messages
const WELCOME_MESSAGE = {
  type: 'assistant',
  content: "Hi there! I'm your materials design assistant. Tell me what kind of material you're looking to design, and I'll help you generate MatterGen code for it.",
  timestamp: new Date().toISOString()
};

// Example properties we might want to show/edit
const MATERIAL_PROPERTIES = [
  { name: 'Bandgap (eV)', key: 'bandgap', value: '2.1', editable: true },
  { name: 'Stability', key: 'stability', value: 'High', editable: true },
  { name: 'Composition', key: 'composition', value: 'SrTiO3', editable: true },
  { name: 'Crystal System', key: 'crystal_system', value: 'Cubic', editable: true },
  { name: 'Density (g/cm³)', key: 'density', value: '5.13', editable: true },
  { name: 'Cost Rating', key: 'cost', value: 'Medium', editable: true }
];

const DesignPage = () => {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');
  const [materialProperties, setMaterialProperties] = useState(MATERIAL_PROPERTIES);
  const [showProperties, setShowProperties] = useState(false);
  
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Mock function to simulate AI response
  const generateResponse = async (userMessage) => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let response;
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple pattern matching for demo purposes
    if (lowerMessage.includes('perovskite') || lowerMessage.includes('solar')) {
      response = "I can help you design a perovskite material for solar applications. Based on your requirements, I suggest a hybrid organic-inorganic perovskite with the formula CH3NH3PbI3. Would you like me to generate MatterGen code for this material?";
      setShowProperties(true);
      setMaterialProperties([
        { name: 'Bandgap (eV)', key: 'bandgap', value: '1.55', editable: true },
        { name: 'Stability', key: 'stability', value: 'Moderate', editable: true },
        { name: 'Composition', key: 'composition', value: 'CH3NH3PbI3', editable: true },
        { name: 'Crystal System', key: 'crystal_system', value: 'Tetragonal', editable: true },
        { name: 'Density (g/cm³)', key: 'density', value: '4.16', editable: true },
        { name: 'Cost Rating', key: 'cost', value: 'Low', editable: true }
      ]);
    } else if (lowerMessage.includes('battery') || lowerMessage.includes('cathode')) {
      response = "For battery cathode materials, I recommend looking at lithium-rich manganese-based oxides, which can provide high energy density. Would you like me to suggest a specific composition and generate MatterGen code for it?";
      setShowProperties(true);
      setMaterialProperties([
        { name: 'Voltage (V)', key: 'voltage', value: '3.8', editable: true },
        { name: 'Capacity (mAh/g)', key: 'capacity', value: '250', editable: true },
        { name: 'Composition', key: 'composition', value: 'Li1.2Mn0.6Ni0.2O2', editable: true },
        { name: 'Crystal System', key: 'crystal_system', value: 'Layered', editable: true }, 
        { name: 'Stability', key: 'stability', value: 'Good', editable: true },
        { name: 'Cost Rating', key: 'cost', value: 'Medium', editable: true }
      ]);
    } else if (lowerMessage.includes('code') || lowerMessage.includes('generate')) {
      response = "I've generated MatterGen code based on our discussion. You can view it in the 'Code' tab and export it to Google Colab.";
      
      // Generate sample code
      setGeneratedCode(\`# MatterGen code for material design
from mattergen import Dataset, MatSciGen
from mattergen.examples import get_all_docs

# Define your material requirements
requirements = {
    "composition": "${materialProperties.find(p => p.key === 'composition')?.value || 'SrTiO3'}",
    "crystal_system": "${materialProperties.find(p => p.key === 'crystal_system')?.value || 'Cubic'}",
    "target_properties": {
        "bandgap": ${materialProperties.find(p => p.key === 'bandgap')?.value || '2.1'},
        "stability": "${materialProperties.find(p => p.key === 'stability')?.value || 'High'}"
    }
}

# Initialize the MatSciGen model
model = MatSciGen()

# Generate material candidates
candidates = model.generate_materials(**requirements)

# Print the top candidate
print("Top material candidate:")
print(candidates[0])

# Simulate properties
properties = model.simulate_properties(candidates[0])
print("\\nPredicted properties:")
for prop, value in properties.items():
    print(f"{prop}: {value}")
\`);

      // Switch to code tab
      setTabValue(1);
    } else {
      response = "I understand you're looking to design a new material. Could you provide more specific requirements? For example, what application is it for, and what properties are most important? Things like conductivity, transparency, strength, or temperature stability?";
    }
    
    setMessages(prev => [...prev, {
      type: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    }]);
    
    setIsLoading(false);
  };
  
  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      type: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    await generateResponse(input);
  };
  
  // Handle property changes
  const handlePropertyChange = (key, newValue) => {
    setMaterialProperties(prev => 
      prev.map(prop => 
        prop.key === key ? { ...prop, value: newValue } : prop
      )
    );
  };
  
  // Copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    // Could show a snackbar here
  };
  
  // Download code as Python file
  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedCode], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'mattergen_design.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  // Clear chat history
  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setGeneratedCode('');
    setTabValue(0);
    setShowProperties(false);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Design Your Material
      </Typography>
      
      <Grid container spacing={3}>
        {/* Main chat and code area */}
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: 0, 
              borderRadius: 2, 
              overflow: 'hidden',
              height: 'calc(100vh - 200px)',
              display: 'flex', 
              flexDirection: 'column'
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Chat" icon={<InfoIcon />} iconPosition="start" />
                <Tab label="Code" icon={<CodeIcon />} iconPosition="start" />
              </Tabs>
            </Box>
            
            {/* Chat tab */}
            <Box 
              sx={{ 
                display: tabValue === 0 ? 'flex' : 'none', 
                flexDirection: 'column',
                height: '100%'
              }}
            >
              {/* Messages area */}
              <Box 
                sx={{ 
                  p: 2, 
                  overflowY: 'auto', 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {messages.map((message, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      alignSelf: message.type === 'user' ? 'flex-end' : 'flex-start',
                      mb: 2,
                      maxWidth: '80%'
                    }}
                  >
                    <Paper 
                      className={message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}
                      sx={{ 
                        p: 2, 
                        bgcolor: message.type === 'user' ? 'primary.main' : 'background.paper',
                        color: message.type === 'user' ? 'white' : 'text.primary',
                        borderRadius: message.type === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px'
                      }}
                    >
                      <Typography variant="body1">
                        {message.content}
                      </Typography>
                    </Paper>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        mt: 0.5, 
                        opacity: 0.7,
                        textAlign: message.type === 'user' ? 'right' : 'left',
                        display: 'block'
                      }}
                    >
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                ))}
                {isLoading && (
                  <Box 
                    sx={{ 
                      alignSelf: 'flex-start',
                      mb: 2
                    }}
                  >
                    <Paper 
                      sx={{ 
                        p: 2, 
                        bgcolor: 'background.paper',
                        borderRadius: '20px 20px 20px 4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <CircularProgress size={20} sx={{ mr: 2 }} />
                      <Typography variant="body1">Thinking...</Typography>
                    </Paper>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </Box>
              
              {/* Input area */}
              <Box 
                component="form" 
                sx={{ 
                  p: 2, 
                  borderTop: 1, 
                  borderColor: 'divider',
                  bgcolor: 'background.default'
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs>
                    <TextField
                      fullWidth
                      placeholder="Describe your material requirements..."
                      variant="outlined"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={isLoading}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<SendIcon />}
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                    >
                      Send
                    </Button>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleClearChat} color="default">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            
            {/* Code tab */}
            <Box 
              sx={{ 
                display: tabValue === 1 ? 'flex' : 'none',
                flexDirection: 'column',
                height: '100%',
                p: 0
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  p: 0
                }}
              >
                <Box
                  component="pre"
                  sx={{
                    p: 3,
                    m: 0,
                    bgcolor: '#1e1e1e',
                    color: '#d4d4d4',
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '0.875rem',
                    overflowX: 'auto',
                    height: '100%',
                    borderRadius: 0
                  }}
                >
                  <code>{generatedCode}</code>
                </Box>
              </Box>
              
              <Box 
                sx={{ 
                  p: 2, 
                  borderTop: 1, 
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyCode}
                >
                  Copy Code
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadCode}
                >
                  Download
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        {/* Properties panel */}
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              height: 'calc(100vh - 200px)',
              overflowY: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TuneIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Material Properties</Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            {showProperties ? (
              <>
                <Typography variant="body2" color="text.secondary" paragraph>
                  You can adjust these properties to customize your material design:
                </Typography>
                
                <Grid container spacing={2}>
                  {materialProperties.map((prop) => (
                    <Grid item xs={12} key={prop.key}>
                      <TextField
                        label={prop.name}
                        fullWidth
                        variant="outlined"
                        value={prop.value}
                        onChange={(e) => handlePropertyChange(prop.key, e.target.value)}
                        disabled={!prop.editable}
                        margin="dense"
                      />
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ mt: 3 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => {
                      setInput("Generate MatterGen code with these properties");
                      handleSendMessage();
                    }}
                  >
                    Generate MatterGen Code
                  </Button>
                </Box>
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  Describe your material requirements in the chat to see and edit properties.
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Example Requests:
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                    <Chip 
                      label="Perovskite for solar cells" 
                      clickable
                      onClick={() => {
                        setInput("I need a perovskite material for solar cells");
                        handleSendMessage();
                      }}
                    />
                    <Chip 
                      label="Battery cathode material" 
                      clickable
                      onClick={() => {
                        setInput("Design a battery cathode material");
                        handleSendMessage();
                      }}
                    />
                    <Chip 
                      label="Transparent conductor" 
                      clickable
                      onClick={() => {
                        setInput("I'm looking for a transparent conducting material");
                        handleSendMessage();
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DesignPage;