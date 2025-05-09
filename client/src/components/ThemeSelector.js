import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  Typography,
  Grid,
  useTheme
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

const themes = [
  { id: 'light', name: 'Light' },
  { id: 'dark', name: 'Dark' },
  { id: 'nature', name: 'Nature' },
  { id: 'ocean', name: 'Ocean' },
  { id: 'sunset', name: 'Sunset' }
];

const ThemeSelector = ({ currentTheme, onThemeSelect }) => {
  const theme = useTheme();

  const getThemeColors = (themeId) => {
    const themeColors = {
      light: {
        primary: '#ffffff',
        secondary: '#f5f5f5',
        accent: '#007bff'
      },
      dark: {
        primary: '#1a1a1a',
        secondary: '#2d2d2d',
        accent: '#00a8ff'
      },
      nature: {
        primary: '#f4f9f4',
        secondary: '#e8f3e8',
        accent: '#4a7c59'
      },
      ocean: {
        primary: '#e3f2fd',
        secondary: '#bbdefb',
        accent: '#0277bd'
      },
      sunset: {
        primary: '#fff3e0',
        secondary: '#ffe0b2',
        accent: '#ff7043'
      }
    };

    return themeColors[themeId];
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Choose Theme
      </Typography>
      <Grid container spacing={2}>
        {themes.map((themeOption) => {
          const colors = getThemeColors(themeOption.id);
          const isSelected = currentTheme === themeOption.id;

          return (
            <Grid item xs={6} sm={4} key={themeOption.id}>
              <Card
                sx={{
                  position: 'relative',
                  height: '100px',
                  cursor: 'pointer',
                  border: isSelected
                    ? `2px solid ${theme.palette.primary.main}`
                    : '2px solid transparent'
                }}
              >
                <CardActionArea
                  onClick={() => onThemeSelect(themeOption.id)}
                  sx={{ height: '100%' }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        background: colors.primary,
                        borderBottom: `20px solid ${colors.secondary}`
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: colors.accent
                      }}
                    />
                    {isSelected && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          color: theme.palette.primary.main
                        }}
                      >
                        <CheckIcon />
                      </Box>
                    )}
                  </Box>
                </CardActionArea>
              </Card>
              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 1 }}
              >
                {themeOption.name}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ThemeSelector; 