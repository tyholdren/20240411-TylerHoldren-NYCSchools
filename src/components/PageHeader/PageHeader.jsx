import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

export default function PageHeader({ selectSchool }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const handleSearch = async (event, value) => {
    const encodedInput = encodeURIComponent(value.toLowerCase());
    const fetchURL = `https://data.cityofnewyork.us/resource/s3k6-pzi2.json?$where=starts_with(lower(school_name), '${encodedInput}')&$limit=5`;

    try {
      const response = await fetch(fetchURL);
      const results = await response.json();
      setOptions(results);
    } catch (error) {
      console.error(`Search input error: ${error}`);
    }
  };

  return (
    <Autocomplete
      id="school-search"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={option => option.school_name}
      options={options}
      loading={loading}
      onInputChange={handleSearch}
      onChange={(event, newValue) => {
        selectSchool(null, newValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Search by school name"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <div>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </div>
            ),
          }}
        />
      )}
    />
  );
}
