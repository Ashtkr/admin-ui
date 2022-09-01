import * as React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Search.css';

const Search = ({setQuery}) => {
  return (
    <Box className='search-bar'>
      <TextField fullWidth label="Search" id="fullWidth"
        onChange ={(event) => setQuery(event.target.value)}/>
    </Box>
  );
}

export default Search