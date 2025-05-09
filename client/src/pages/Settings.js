import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ThemeSelector from '../components/ThemeSelector';
import PersonalitySelector from '../components/PersonalitySelector';
import { useAuth } from '../utils/AuthContext';
import api from '../utils/api';

const Settings = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const handleThemeChange = async (theme) => {
    try {
      const response = await api.put('/auth/preferences', {
        theme
      });
      updateUser({ ...user, preferences: response.data.preferences });
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  const handlePersonalityChange = async (personality) => {
    try {
      const response = await api.put('/auth/preferences', {
        personality
      });
      updateUser({ ...user, preferences: response.data.preferences });
    } catch (error) {
      console.error('Error updating personality:', error);
    }
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
          Settings
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ mb: 4 }}>
        <ThemeSelector
          currentTheme={user.preferences?.theme || 'light'}
          onThemeSelect={handleThemeChange}
        />
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Paper elevation={3}>
        <PersonalitySelector
          currentPersonality={user.preferences?.personality || 'friendly'}
          onPersonalitySelect={handlePersonalityChange}
        />
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Theme and personality preferences are automatically saved and will be applied to all your future chats.
        </Typography>
      </Box>
    </Container>
  );
};

export default Settings; 