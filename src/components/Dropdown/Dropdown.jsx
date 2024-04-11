import { useEffect, useState } from 'react';

export default function Dropdown({
  buttonValue,
  filterValue,
  updateView,
  fetchFilteredResults,
}) {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const toggleFilters = () => {
    setShowFilterOptions(!showFilterOptions);
  };

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
