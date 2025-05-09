import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
  Avatar
} from '@mui/material';
import {
  EmojiEmotions as FriendlyIcon,
  Work as ProfessionalIcon,
  Brush as CreativeIcon,
  Code as TechnicalIcon,
  TheaterComedy as HumorousIcon,
  Check as CheckIcon
} from '@mui/icons-material';

const personalities = [
  {
    id: 'friendly',
    name: 'Friendly',
    description: 'Warm and approachable, focused on being helpful and supportive',
    icon: FriendlyIcon,
    color: '#4caf50'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Formal and business-like, providing clear and concise information',
    icon: ProfessionalIcon,
    color: '#2196f3'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Imaginative and artistic, offering unique perspectives',
    icon: CreativeIcon,
    color: '#9c27b0'
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Detail-oriented and precise, specializing in technical explanations',
    icon: TechnicalIcon,
    color: '#f44336'
  },
  {
    id: 'humorous',
    name: 'Humorous',
    description: 'Witty and light-hearted, making interactions fun while being helpful',
    icon: HumorousIcon,
    color: '#ff9800'
  }
];

const PersonalitySelector = ({ currentPersonality, onPersonalitySelect }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Choose AI Personality
      </Typography>
      <Grid container spacing={2}>
        {personalities.map((personality) => {
          const Icon = personality.icon;
          const isSelected = currentPersonality === personality.id;

          return (
            <Grid item xs={12} sm={6} md={4} key={personality.id}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  border: isSelected
                    ? `2px solid ${personality.color}`
                    : '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                <CardActionArea
                  onClick={() => onPersonalitySelect(personality.id)}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: personality.color,
                          mr: 2
                        }}
                      >
                        <Icon />
                      </Avatar>
                      <Typography variant="h6" component="div">
                        {personality.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {personality.description}
                    </Typography>
                    {isSelected && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          color: personality.color
                        }}
                      >
                        <CheckIcon />
                      </Box>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default PersonalitySelector; 