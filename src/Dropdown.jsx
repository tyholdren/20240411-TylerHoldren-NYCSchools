import { useState } from 'react';

export default function Dropdown({ buttonValue, filterValue }) {
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const toggleFilters = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  return (
    <div>
      <button onClick={toggleFilters}>{buttonValue}</button>
      <div type="button" className="filter-options" hidden={!showFilterOptions}>
        <label htmlFor="filter" />
        <select id="filter" name="filter">
          {filterValue.map(({ value, filter }, index) => {
            return (
              <option key={index} value={value}>
                {filter}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
