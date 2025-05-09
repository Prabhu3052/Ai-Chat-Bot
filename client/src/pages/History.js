import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Chat as ChatIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const History = () => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await api.get('/chat');
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await api.delete(`/chat/${chatId}`);
      setChats(chats.filter(chat => chat._id !== chatId));
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const filteredChats = chats.filter(chat => {
    const searchLower = searchTerm.toLowerCase();
    return (
      chat.title.toLowerCase().includes(searchLower) ||
      chat.messages.some(msg => 
        msg.content.toLowerCase().includes(searchLower)
      )
    );
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLastMessage = (messages) => {
    if (messages.length === 0) return 'No messages';
    return messages[messages.length - 1].content.slice(0, 100) + '...';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Back to Chat
        </Button>
        <Typography variant="h4" gutterBottom>
          Chat History
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search in chats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Paper elevation={3}>
        <List>
          {filteredChats.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="No chats found"
                secondary={searchTerm ? "Try different search terms" : "Start a new chat to see it here"}
              />
            </ListItem>
          ) : (
            filteredChats.map((chat) => (
              <ListItem
                key={chat._id}
                button
                onClick={() => navigate(`/?chat=${chat._id}`)}
                divider
              >
                <ChatIcon sx={{ mr: 2, color: 'primary.main' }} />
                <ListItemText
                  primary={chat.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {formatDate(chat.updatedAt)}
                      </Typography>
                      <br />
                      {getLastMessage(chat.messages)}
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default History; 