import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const pageSizes = [5, 10, 15, 20];

export default function PaginationSelect({ handleLimitChange }) {
  const [pageSize, setPageSize] = useState(0);

  const handleChange = event => {
    const newLimit = event.target.value;

    setPageSize(newLimit);
    handleLimitChange(newLimit);
  };

  return (
    <Box sx={{ minWidth: 150, marginRight: 0 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">page size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pageSize}
          label="page-size"
          onChange={handleChange}
        >
          {pageSizes.map((size, index) => {
            return (
              <MenuItem key={`size-${index}`} value={size}>
                {size}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
