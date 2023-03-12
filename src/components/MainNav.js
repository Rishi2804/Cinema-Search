import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';



export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{
      width: '100%', 
      position: "fixed", 
      bottom: 0, 
      zIndex: 100
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction 
          label="Trending" 
          icon={<WhatshotIcon />} 
          LinkComponent={Link}
          to='/'
        />
        <BottomNavigationAction 
          label="Movies"
          icon={<MovieIcon />} 
          LinkComponent={Link}
          to='/movies'
        />
        <BottomNavigationAction 
          label="TV Series"
          icon={<TvIcon />}
          LinkComponent={Link}
          to='/series' 
        />
        <BottomNavigationAction 
          label="Search" 
          icon={<SearchIcon />} 
          LinkComponent={Link}
          to='/search'
        />
      </BottomNavigation>
    </Box>
  );
}