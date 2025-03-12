import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} SoulCity Live. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Github size={20} />
              <Typography variant="body2">Source</Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;