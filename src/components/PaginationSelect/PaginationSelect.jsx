import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const pageSizes = [5, 10, 15, 20];

export default function PaginationSelect() {
  const [pageSize, setPageSize] = useState('');

  const handleChange = event => {
    setPageSize(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">page size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pageSize}
          label="page-size"
          onChange={handleChange}
        >
          {pageSizes.map(size => {
            return <MenuItem value={size}>{size}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
