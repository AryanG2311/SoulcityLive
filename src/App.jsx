import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { theme } from './styles/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import FilterMenu from './components/FilterMenu';
import StreamList from './components/StreamList';
import UnderratedSection from './components/UnderratedSection';
import { fetchLiveStreams } from './services/youtubeAPI';

function App() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('viewers');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadStreams = async () => {
      try {
        setLoading(true);
        const { streams: fetchedStreams } = await fetchLiveStreams('', selectedCategory);
        if (Array.isArray(fetchedStreams)) {  // Ensure we have an array
          setStreams(fetchedStreams);
          setError(null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError('Failed to load streams');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadStreams();
    
    // Cleanup function
    return () => {
      // Any cleanup logic if needed
    };
  }, [selectedCategory]);

  const sortedAndFilteredStreams = React.useMemo(() => {
    if (!streams || !streams.length) return [];
    
    let filteredStreams = [...streams];

    if (searchQuery) {
      filteredStreams = filteredStreams.filter(stream =>
        (stream.snippet?.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (stream.snippet?.channelTitle || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredStreams.sort((a, b) => {
      switch (sortBy) {
        case 'viewers':
          return (
            parseInt(b.liveStreamingDetails?.concurrentViewers || 0) -
            parseInt(a.liveStreamingDetails?.concurrentViewers || 0)
          );
        case 'likes':
          return parseInt(b.statistics?.likeCount || 0) - parseInt(a.statistics?.likeCount || 0);
        case 'newest':
          return (
            new Date(b.snippet?.publishedAt || 0) - new Date(a.snippet?.publishedAt || 0)
          );
        default:
          return 0;
      }
    });
  }, [streams, sortBy, searchQuery]);

  const featuredStreams = React.useMemo(() => {
    if (!streams || !streams.length) return [];
    
    return streams
      .filter(stream => stream.liveStreamingDetails?.concurrentViewers)
      .sort((a, b) => 
        parseInt(b.liveStreamingDetails?.concurrentViewers || 0) -
        parseInt(a.liveStreamingDetails?.concurrentViewers || 0)
      )
      .slice(0, 5);
  }, [streams]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: 'url(https://soulcity.gg/Soulcity_Cover.jpg)',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay for better readability
            zIndex: 0
          }
        }}
      >
        <Header />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            position: 'relative',
            zIndex: 1 // Ensure content is above the overlay
          }}
        >
          <HeroSection featuredStreams={featuredStreams} />
          <Container>
            <FilterMenu
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <StreamList 
              streams={sortedAndFilteredStreams}
              loading={loading}
              error={error}
            />
          </Container>
          <Box sx={{ mt: 6 }}>
            <UnderratedSection streams={streams} />
          </Box>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;