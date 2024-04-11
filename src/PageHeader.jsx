import { useState, useEffect } from 'react';

export default function PageHeader({ selectSchool }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const debounce = (fn, delay) => {
    let timeoutId = null;

    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const debouncedFetchSearchResults = debounce(async input => {
    const encodedInput = encodeURIComponent(input.toLowerCase());
    const fetchURL = `https://data.cityofnewyork.us/resource/s3k6-pzi2.json?$where=starts_with(lower(school_name), '${encodedInput}')&$limit=5`;

    try {
      const response = await fetch(fetchURL);
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error(`Search input error: ${error}`);
    }
  }, 500);

  useEffect(() => {
    if (searchInput) {
      debouncedFetchSearchResults(searchInput);
    }
    if (searchInput.length === 0) {
      setSearchResults([]);
    }
  }, [searchInput]);

  const handleChange = event => {
    setSearchInput(event.target.value);
  };

  const getFromLoadedResults = event => {
    const selectedResult = event.target.textContent.toLowerCase();
    const selectedSchool = searchResults.filter(
      result => result.school_name.toLowerCase() === selectedResult
    );

    return selectedSchool;
  };

  return (
    <div
      onClick={event => {
        if (event.target.tagName === 'BUTTON') {
          const selectedSchool = getFromLoadedResults(event);
          selectSchool(null, ...selectedSchool);
        }
      }}
    >
      <label htmlFor="school-search">
        Find the school that best matches your needs
      </label>
      <input
        id="school-search"
        name="school-search"
        type="text"
        value={searchInput}
        placeholder="Search by school name"
        onChange={handleChange}
      />
      <div>
        <label htmlFor="search-results" />
        <div className="search-results-container">
          {searchResults.length > 0 &&
            searchResults.map((result, index) => {
              return (
                <button
                  key={`result-${index}`}
                  className="search-result"
                  value={result}
                >
                  {result.school_name}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
