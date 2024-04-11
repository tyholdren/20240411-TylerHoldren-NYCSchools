// import { useEffect, useState } from 'react';

// export default function Dropdown({
//   buttonValue,
//   filterValue,
//   updateView,
//   fetchFilteredResults,
// }) {
//   const [showFilterOptions, setShowFilterOptions] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState('');

//   const toggleFilters = () => {
//     setShowFilterOptions(!showFilterOptions);
//   };

//   const handleFilterChange = event => {
//     setSelectedFilter(event.target.value);
//     updateView();
//   };

//   useEffect(() => {
//     try {
//       fetchFilteredResults(selectedFilter);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }, [selectedFilter]);

//   return (
//     <div>
//       <button onClick={toggleFilters}>{buttonValue}</button>
//       <div type="button" className="filter-options" hidden={!showFilterOptions}>
//         <label htmlFor="filter" />
//         <select
//           id="filter"
//           name="filter"
//           value={selectedFilter}
//           onChange={handleFilterChange}
//         >
//           {filterValue.map(({ _, filter }, index) => {
//             return (
//               <option key={index} value={filter}>
//                 {filter}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal'; // Make sure to import the Modal component

export default function Dropdown({
  buttonValue,
  filterValue,
  updateView,
  fetchFilteredResults,
}) {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

  const toggleFilters = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  const handleFilterChange = event => {
    setSelectedFilter(event.target.value);
    updateView();
  };

  const handleOptionClick = filter => {
    // This could be the function to open the modal with specific content
    // For example, if each option in the dropdown should open the modal:
    setSelectedFilter(filter);
    setIsModalOpen(true);
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
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            {filterValue.map(({ _, filter }, index) => {
              return (
                // Add an onClick handler to each option to trigger the modal
                <option
                  key={index}
                  value={filter}
                  onClick={() => handleOptionClick(filter)}
                >
                  {filter}
                </option>
              );
            })}
          </Modal>
        </select>
      </div>
    </div>
  );
}
