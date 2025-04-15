import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';

const ChatInterface = ({ 
  title, 
  prompt, 
  onMessageInterpretation, 
  context = {}, 
  apiEndpoint = '/api/chat/query' 
}) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: prompt }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send message to API
      const response = await axios.post(apiEndpoint, {
        text: input,
        context: {
          ...context,
          extract_params: true,
          chat_history: messages
        }
      });

      // Add assistant response to chat
      const assistantMessage = { 
        role: 'assistant', 
        content: response.data.text 
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // If there's an interpretation callback and response has interpretations
      if (onMessageInterpretation && response.data.interpretations) {
        onMessageInterpretation(
          response.data.interpretations, 
          response.data.mattergen_params
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your message. Please try again.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: prompt }]);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        maxHeight: 500,
        overflow: 'hidden',
        borderRadius: 2
      }}
    >
      {/* Chat header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Box>
          <Tooltip title="Clear chat history">
            <IconButton onClick={clearChat} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="This chat helps you describe your material properties in plain language">
            <IconButton size="small">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Chat messages */}
      <Box sx={{ 
        p: 2, 
        flexGrow: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            className={`chat-bubble ${message.role === 'user' ? 'user-bubble' : 'assistant-bubble'}`}
            sx={{
              alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              mb: 1,
              p: 1.5,
              borderRadius: 2,
              bgcolor: message.role === 'user' ? 'primary.light' : 'grey.100',
              color: message.role === 'user' ? 'white' : 'text.primary'
            }}
          >
            <Typography variant="body1">
              {message.content}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input area */}
      <Box 
        component="form" 
        onSubmit={handleSend}
        sx={{ 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          size="small"
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          disabled={loading || !input.trim()}
          type="submit"
        >
          {loading ? 'Sending' : 'Send'}
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatInterface;