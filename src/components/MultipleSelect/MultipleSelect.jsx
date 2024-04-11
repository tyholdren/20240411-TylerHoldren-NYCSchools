import { useEffect, useState } from 'react';
import * as React from 'react';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export default function MultipleSelect({
  buttonValue,
  filterValue,
  updateView,
  fetchFilteredResults,
}) {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = event => {
    setSelectedFilter(event.target.value);
    updateView();
  };

  useEffect(() => {
    try {
      fetchFilteredResults(selectedFilter);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [selectedFilter]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-name-label">{buttonValue}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedFilter}
          onChange={handleFilterChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {filterValue.map(filter => {
            return (
              <MenuItem key={filter} value={filter}>
                {filter}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
