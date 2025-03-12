import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';

const HeroSection = ({ featuredStreams }) => {
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStreamIndex((prev) => 
        prev === featuredStreams.length - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [featuredStreams.length]);

  if (!featuredStreams?.length) return null;

  const currentStream = featuredStreams[currentStreamIndex];

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 } }}>
      <Box sx={{ 
        position: 'relative',
        height: { xs: '300px', md: '500px' },
        mb: 6,
        mt:6,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        borderRadius: '16px',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStream.id.videoId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ height: '100%' }}
          >
            <Box sx={{ 
              position: 'relative',
              height: '100%',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
              }
            }}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${currentStream.id.videoId}`}
                width="100%"
                height="100%"
                playing
                muted
                config={{
                  youtube: {
                    playerVars: { showinfo: 0, controls: 0, modestbranding: 1 }
                  }
                }}
              />
              
              <Container sx={{ 
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                color: 'white',
                zIndex: 1,
                pb: 4
              }}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Typography variant="h4" gutterBottom>
                    {currentStream.snippet.title}
                  </Typography>
                  <Typography variant="subtitle1">
                    {currentStream.snippet.channelTitle}
                  </Typography>
                </motion.div>
              </Container>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Container>
  );
};

export default HeroSection;