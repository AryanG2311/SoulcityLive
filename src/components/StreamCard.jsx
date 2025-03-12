import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Users, ThumbsUp, Clock } from 'lucide-react';

const StreamCard = ({ stream }) => {
  const formatViewerCount = (count) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(count);
  };

  const formatDuration = (startTime) => {
    const start = new Date(startTime);
    const now = new Date();
    const duration = Math.floor((now - start) / 1000 / 60);
    return duration < 60 ? `${duration}m` : `${Math.floor(duration / 60)}h ${duration % 60}m`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        component="a"
        href={`https://youtube.com/watch?v=${stream.id.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          textDecoration: 'none'
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={stream.snippet.thumbnails.high.url}
          alt={stream.snippet.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap gutterBottom>
            {stream.snippet.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {stream.snippet.channelTitle}
          </Typography>
          
          <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Users size={16} />
              <Typography variant="body2">
                {formatViewerCount(stream.liveStreamingDetails?.concurrentViewers)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ThumbsUp size={16} />
              <Typography variant="body2">
                {formatViewerCount(stream.statistics?.likeCount)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Clock size={16} />
              <Typography variant="body2">
                {formatDuration(stream.liveStreamingDetails?.actualStartTime)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {stream.snippet.tags?.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{ backgroundColor: 'accent.main', color: 'white' }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StreamCard;