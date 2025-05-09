import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
  Button
} from '@mui/material';
import {
  Chat as ChatIcon,
  Add as AddIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({
  chats,
  selectedChat,
  onSelectChat,
  onCreateChat,
  onDeleteChat,
  width = 280
}) => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreateChat}
        >
          New Chat
        </Button>
      </Box>

      <Divider />

      <List sx={{ flex: 1, overflow: 'auto' }}>
        {chats.map((chat) => (
          <ListItem
            key={chat._id}
            button
            selected={selectedChat?._id === chat._id}
            onClick={() => onSelectChat(chat)}
            secondaryAction={
              <IconButton
                edge="end"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat._id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText
              primary={chat.title}
              secondary={
                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap
                >
                  {chat.messages[chat.messages.length - 1]?.content || 'No messages'}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        <ListItem button onClick={() => navigate('/history')}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
        <ListItem button onClick={() => navigate('/settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar; 