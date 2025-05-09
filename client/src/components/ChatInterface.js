import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Paper, 
  Typography, 
  Avatar,
  Snackbar,
  Alert
} from '@mui/material';
import { Send as SendIcon, Person as PersonIcon, SmartToy as BotIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import '../styles/ChatInterface.css';

const ChatInterface = ({ onSendMessage, messages, isLoading }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      try {
        await onSendMessage(message);
        setMessage('');
        setError(null);
      } catch (err) {
        console.error('Error sending message:', err);
        setError(err.message || 'Failed to send message');
        // Don't clear the message if sending failed
      }
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Box className="chat-interface">
      <Paper className="messages-container" elevation={3}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <Avatar className="message-avatar">
              {msg.role === 'user' ? <PersonIcon /> : <BotIcon />}
            </Avatar>
            <Box className="message-content">
              <Typography variant="body1">{msg.content}</Typography>
              <Typography variant="caption" className="message-timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </Typography>
            </Box>
          </Box>
        ))}
        {isLoading && (
          <Box className="bot-message">
            <Avatar className="message-avatar">
              <BotIcon />
            </Avatar>
            <Box className="message-content">
              <Typography variant="body1">
                <span className="typing-indicator">Thinking</span>
              </Typography>
            </Box>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Paper>

      <form onSubmit={handleSubmit} className="message-input-container">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <IconButton
                type="submit"
                color="primary"
                disabled={!message.trim() || isLoading}
              >
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </form>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChatInterface;