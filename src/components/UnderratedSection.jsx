import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import StreamList from './StreamList';

const UnderratedSection = ({ streams }) => {
  const underratedStreams = streams.filter(
    stream => parseInt(stream.liveStreamingDetails?.concurrentViewers) < 9
  );

  if (!underratedStreams.length) return null;

  return (
    <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Hidden Gems 💎
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Show your supprt
        </Typography>
        <StreamList streams={underratedStreams} />
      </Container>
    </Box>
  );
};

export default UnderratedSection;