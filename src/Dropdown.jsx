import { useEffect, useState } from 'react';

const filteredCitiesURL =
  'https://data.cityofnewyork.us/resource/s3k6-pzi2.json?city=';

export default function Dropdown({
  buttonValue,
  filterValue,
  fetchFilteredResults,
}) {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const toggleFilters = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const handleFilterChange = event => {
    console.log('handle filter change:', event);
    setSelectedFilter(event.target.value);
  };

  useEffect(() => {
    try {
      fetchFilteredResults(selectedFilter);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [selectedFilter]);

  //console.log({ selectedFilter });

  return (
    <div>
      <button onClick={toggleFilters}>{buttonValue}</button>
      <div type="button" className="filter-options" hidden={!showFilterOptions}>
        <label htmlFor="filter" />
        <select
          id="filter"
          name="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          {filterValue.map(({ _, filter }, index) => {
            return (
              <option key={index} value={filter}>
                {filter}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
