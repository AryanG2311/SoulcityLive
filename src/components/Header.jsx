import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton } from '@mui/material';
import { Monitor, MessageCircle, MessagesSquare } from 'lucide-react';

const Header = () => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.12)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            py: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Monitor size={28} className="text-purple-600" />
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                backgroundClip: 'text',
                color: 'transparent',
                textDecoration: 'none',
              }}
            >
              SoulCity Live
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2
          }}>
            <Button
              variant="text"
              startIcon={<MessageCircle size={20} />}
              sx={{ 
                color: 'text.primary',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
              href="mailto:contact@soulcity.live"
            >
              Contact Us
            </Button>
            
            <Button
              variant="contained"
              startIcon={<MessagesSquare size={20} />}
              sx={{
                background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4f46e5, #7c3aed)'
                }
              }}
              href="https://discord.gg/soulcity"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Discord
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;