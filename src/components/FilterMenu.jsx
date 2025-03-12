import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Stack,
  Typography,
  Paper
} from '@mui/material';
import { CATEGORIES, SORT_OPTIONS } from '../utils/constants';

const FilterMenu = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        mb: 4, 
        p: 3,
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          color: '#2c3e50',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <svg className="w-5 h-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
        </svg>
        Browse Streams
      </Typography>
      
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', md: 'center' }}
        sx={{ mb: 3 }}
      >
        <FormControl 
          variant="outlined" 
          sx={{ 
            flex: 1,
            minWidth: { xs: '100%', md: 200 },
          }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {CATEGORIES.map((category) => (
              <MenuItem key={category.id} value={category.tag}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl 
          variant="outlined" 
          sx={{ 
            flex: 1,
            minWidth: { xs: '100%', md: 200 },
          }}
        >
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search Streams"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ 
            flex: 2,
            minWidth: { xs: '100%', md: 300 },
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }
            }
          }}
          InputProps={{
            endAdornment: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
            ),
          }}
        />
      </Stack>

      <Typography variant="body2" sx={{ mb: 1, color: '#546e7a' }}>
        Quick Filters:
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {CATEGORIES.map((category) => (
          <Chip
            key={category.id}
            label={category.label}
            onClick={() => setSelectedCategory(category.tag)}
            color={selectedCategory === category.tag ? "primary" : "default"}
            sx={{ 
              m: 0.5, 
              backgroundColor: selectedCategory === category.tag 
                ? '#3f51b5'
                : 'rgba(255, 255, 255, 0.7)',
              color: selectedCategory === category.tag ? 'white' : '#2c3e50',
              fontWeight: selectedCategory === category.tag ? 'bold' : 'normal',
              borderRadius: '16px',
              '&:hover': {
                backgroundColor: selectedCategory === category.tag 
                  ? '#303f9f'
                  : 'rgba(255, 255, 255, 0.9)',
              },
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default FilterMenu;