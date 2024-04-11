import SchoolCard from './SchoolCard';
import Dropdown from './Dropdown';
import { useState, useEffect } from 'react';
import SelectedSchool from './SelectedSchool';
import PageHeader from './PageHeader';

import { CITIES, TOTAL_STUDENTS, VIEW_OPTIONS } from './utils';

let BASE_URL = 'https://data.cityofnewyork.us/resource/s3k6-pzi2.json';
const URL_SCORES = 'https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=';
const LIMIT = 5;

export default function SchoolsDashboard() {
  const [schoolsCache, setSchoolsCache] = useState({});
  const [currentSchools, setCurrentSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState([]);
  const [selectedView, setSelectedView] = useState(VIEW_OPTIONS[0]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchSchoolsAndScores(null);
  }, [offset]);

  async function fetchSchoolsAndScores(cityFilter) {
    let baseURL = `${BASE_URL}?$limit=${LIMIT}&$offset=${offset}`;
    if (cityFilter) {
      baseURL += `&city=${encodeURIComponent(cityFilter)}`;
    }
    if (schoolsCache[offset] && !cityFilter) {
      setCurrentSchools(schoolsCache[offset]);
      if (selectedSchool.length === 0) {
        setSelectedSchool([schoolsCache[offset][0]]);
      }
    } else {
      try {
        const response = await fetch(baseURL);
        const data = await response.json();
        const schoolsWithScores = await Promise.all(
          data.map(async school => {
            const scoresResponse = await fetch(`${URL_SCORES}${school.dbn}`);
            const scoresData = await scoresResponse.json();
            return {
              ...school,
              scores: scoresData.length ? scoresData[0] : null,
            };
          })
        );
        const updatedCache = { ...schoolsCache, [offset]: schoolsWithScores };
        setSchoolsCache(updatedCache);
        setCurrentSchools(schoolsWithScores);
        if (selectedSchool.length === 0) {
          setSelectedSchool([schoolsWithScores[0]]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  const handleSelectedSchool = (index, selectedSchool) => {
    if (index === null) {
      setSelectedSchool([selectedSchool]);
    } else {
      setSelectedSchool([currentSchools[index]]);
    }
  };

  const handleViewSelection = index => {
    setSelectedView(VIEW_OPTIONS[index]);
  };

  const handlePrevClick = () => {
    setOffset(Math.max(0, offset - LIMIT));
  };

  const handleNextClick = () => {
    setOffset(offset + LIMIT);
  };

  const handleCityFilterChange = cityFilter => {
    fetchSchoolsAndScores(cityFilter);
  };

  return (
    <div>
      <PageHeader selectSchool={handleSelectedSchool} />
      <div className="dropdown-container">
        <Dropdown
          buttonValue="Cities *"
          filterValue={CITIES}
          fetchFilteredResults={handleCityFilterChange}
        />
        <Dropdown
          buttonValue="Students *"
          filterValue={TOTAL_STUDENTS}
          fetchFilteredResults={handleCityFilterChange}
        />
      </div>
      <div className="results-labels">
        {VIEW_OPTIONS.map((view, index) => {
          return (
            <div
              key={index}
              onClick={() => handleViewSelection(index)}
              className={
                selectedView === view ? 'active-view' : 'non-active-view'
              }
            >
              {view}
            </div>
          );
        })}
      </div>
      <div className="schools-container">
        <div>
          {currentSchools.map((school, index) => (
            <SchoolCard
              key={school.dbn}
              {...school}
              handleClick={() => handleSelectedSchool(index, false)}
            />
          ))}
        </div>
        <div>
          {selectedSchool.length > 0 && (
            <SelectedSchool {...selectedSchool[0]} />
          )}
        </div>
      </div>
      <div className="pagination-container">
        <span>{`Results ${offset} - ${offset + 5}`}</span>
        <div className="pagination-container-buttons">
          <button disabled={offset === 0} onClick={handlePrevClick}>
            See previous schools
          </button>
          <button onClick={handleNextClick}>See more schools</button>
        </div>
      </div>
    </div>
  );
}
