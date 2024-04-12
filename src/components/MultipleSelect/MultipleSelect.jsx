import { useEffect, useState } from 'react';

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
  updateSelectedFilters,
  filters,
  clearFilter,
}) {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = event => {
    const newFilterSelection = event.target.value;
    setSelectedFilter(newFilterSelection);
    updateView();

    const newFilter = { ...filters, [buttonValue]: !!newFilterSelection };
    updateSelectedFilters(newFilter);
  };

  useEffect(() => {
    try {
      fetchFilteredResults(selectedFilter);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [selectedFilter]);

  useEffect(() => {
    if (clearFilter) {
      setSelectedFilter('');
      updateView();
    }
  }, [clearFilter]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        marginTop: '8px',
        marginBottom: '8px',
      }}
    >
      <FormControl sx={{ marginRight: 5, minWidth: 200 }}>
        <InputLabel shrink={selectedFilter.length > 0}>
          {buttonValue}
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedFilter}
          onChange={handleFilterChange}
          input={<OutlinedInput label={buttonValue} />}
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
