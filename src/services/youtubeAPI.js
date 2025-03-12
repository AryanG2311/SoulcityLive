import axios from 'axios';
import { YOUTUBE_API_KEY } from '../utils/constants';

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: YOUTUBE_API_KEY,
  },
});

// Function to fetch live streams with specific title conditions
export const fetchLiveStreams = async (pageToken = '', category = '') => {
  try {
    // Search query to fetch live streams that are relevant to the hashtags or keywords
    const searchQuery = `#lifeinsoulcity OR #soulcity OR "gta 5 rp soulcity"${category ? ` ${category}` : ''}`;

    const response = await youtube.get('/search', {
      params: {
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        eventType: 'live', // Ensures we only get live videos
        maxResults: 50,
        pageToken,
      },
    });

    // If there are no live videos, return an empty result
    if (response.data.items.length === 0) {
      return { streams: [], nextPageToken: '', totalResults: 0 };
    }

    const videoIds = response.data.items.map(item => item.id.videoId).join(',');
    const videoStats = await youtube.get('/videos', {
      params: {
        part: 'statistics,liveStreamingDetails',
        id: videoIds,
      },
    });

    // Filter only those that are currently live and match the desired conditions
    const liveStreams = response.data.items.filter((item, index) => {
      const liveDetails = videoStats.data.items[index].liveStreamingDetails;
      const title = item.snippet.title.toLowerCase();
      
      // Check if the title contains the relevant hashtags or keywords
      const containsHashtag = title.includes('#lifeinsoulcity') || title.includes('#soulcity');
      const containsGtaCondition = title.includes('gta 5 rp soulcity');

      // Ensure the stream is live and matches one of the conditions (hashtag or specific phrase in title)
      return (liveDetails && liveDetails.actualStartTime && (containsHashtag || containsGtaCondition));
    }).map((item, index) => ({
      ...item,
      statistics: videoStats.data.items[index].statistics,
      liveStreamingDetails: videoStats.data.items[index].liveStreamingDetails,
    }));

    return {
      streams: liveStreams,
      nextPageToken: response.data.nextPageToken,
      totalResults: response.data.pageInfo.totalResults,
    };
  } catch (error) {
    console.error('Error fetching live streams:', error);
    throw error;
  }
};

// Fetch the details of a specific stream (still ensures it's live and matches the required conditions)
export const fetchStreamDetails = async (videoId) => {
  try {
    const response = await youtube.get('/videos', {
      params: {
        part: 'snippet,statistics,liveStreamingDetails',
        id: videoId,
      },
    });

    const streamDetails = response.data.items[0];
    const liveDetails = streamDetails.liveStreamingDetails;
    const title = streamDetails.snippet.title.toLowerCase();

    // Check if the title contains relevant hashtags or the "gta 5 rp soulcity" phrase
    const containsHashtag = title.includes('#lifeinsoulcity') || title.includes('#soulcity');
    const containsGtaCondition = title.includes('gta 5 rp soulcity');

    // Ensure the stream is live and matches one of the conditions
    if (liveDetails && liveDetails.actualStartTime && (containsHashtag || containsGtaCondition)) {
      return streamDetails;
    }

    return null; // Return null if not live or doesn't match the condition
  } catch (error) {
    console.error('Error fetching stream details:', error);
    throw error;
  }
};
