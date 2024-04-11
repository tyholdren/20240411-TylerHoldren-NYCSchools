import { useState, useEffect } from 'react';

// const URL_FILTER = `https://data.cityofnewyork.us/resource/s3k6-pzi2.json?school_name=${encodedSchoolName}&$limit=1`;

const BASE_URL =
  'https://data.cityofnewyork.us/resource/s3k6-pzi2.json?$where=school_name like ';

export default function PageHeader() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      if (searchInput) {
        const encodedInput = encodeURIComponent(searchInput.toLowerCase());
        const fetchURL = `https://data.cityofnewyork.us/resource/s3k6-pzi2.json?$where=starts_with(lower(school_name), '${encodedInput}')&$limit=5`;

        console.log({ fetchURL });
        try {
          const response = await fetch(fetchURL);
          const results = await response.json();
          console.log({ results });
          setSearchResults(results);
        } catch (error) {
          console.log(`Search input error ${error}`);
        }
      }
    }
    fetchSearchResults();
  }, [searchInput]);

  const handleChange = event => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
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
        <select>
          {searchResults.length > 0 &&
            searchResults.map((result, index) => {
              return (
                <option key={`result-${index}`} value={result}>
                  {result.school_name}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
}
