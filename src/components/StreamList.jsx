import React from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import StreamCard from './StreamCard';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const StreamList = ({ streams, loading, error }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography color="error">Error loading streams. Please try again later.</Typography>
      </Box>
    );
  }

  if (!streams?.length) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography>No streams found matching your criteria.</Typography>
      </Box>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Grid container spacing={3}>
        {streams.map((stream) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={stream.id.videoId}>
            <motion.div variants={item}>
              <StreamCard stream={stream} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default StreamList;