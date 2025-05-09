import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../utils/AuthContext';
import api from '../utils/api';

const Home = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
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

  const handleCreateChat = async () => {
    try {
      const response = await api.post('/chat', {
        title: 'New Chat',
        personality: user.preferences.personality || 'friendly'
      });
      setChats([response.data, ...chats]);
      setSelectedChat(response.data);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await api.delete(`/chat/${chatId}`);
      setChats(chats.filter(chat => chat._id !== chatId));
      if (selectedChat?._id === chatId) {
        setSelectedChat(null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleSendMessage = async (content) => {
    if (!selectedChat) return;
  
    setIsLoading(true);
    try {
      const response = await api.post('/chat/message', {
        chatId: selectedChat._id,
        content
      });
      
      setChats(chats.map(chat => 
        chat._id === selectedChat._id ? response.data : chat
      ));
      setSelectedChat(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error; // This will be caught by ChatInterface
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        onCreateChat={handleCreateChat}
        onDeleteChat={handleDeleteChat}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {selectedChat ? (
          <ChatInterface
            messages={selectedChat.messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        ) : (
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" gutterBottom>
              Welcome to AI Chat
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Select a chat from the sidebar or create a new one to get started
            </Typography>
          </Container>
        )}
      </Box>
    </Box>
  );
};

export default Home; 