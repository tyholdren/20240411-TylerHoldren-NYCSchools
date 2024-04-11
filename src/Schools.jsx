import School from './School';
import Dropdown from './Dropdown';
import { useState, useEffect } from 'react';
import { CITIES, TOTAL_STUDENTS } from './utils';
import SelectedSchool from './SelectedSchool';

const URL_SCHOOLS = 'https://data.cityofnewyork.us/resource/s3k6-pzi2.json';
const URL_SCORES = 'https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=';
const LIMIT = 5;

// const URL_FILTER =
//   'https://data.cityofnewyork.us/resource/s3k6-pzi2.json?school_name=Clinton School Writers & Artists, M.S. 260';

const schoolName = 'Clinton School W';
const encodedSchoolName = encodeURIComponent(schoolName);
const URL_FILTER = `https://data.cityofnewyork.us/resource/s3k6-pzi2.json?school_name=${encodedSchoolName}&$limit=1`;

const BASE_URL = 'https://data.cityofnewyork.us/resource/s3k6-pzi2.json';
const userInput = 'Clin'; // This would be dynamic based on user input
const encodedInput = encodeURIComponent(`'${userInput}%'`);
const query = `?school_name like ${encodedInput}`;

const fetchURL = BASE_URL + query;

export default function Schools() {
  const [schoolsCache, setSchoolsCache] = useState({});
  const [currentSchools, setCurrentSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    async function fetchSchoolsAndScores() {
      if (schoolsCache[offset]) {
        setCurrentSchools(schoolsCache[offset]);
        if (selectedSchool.length === 0) {
          setSelectedSchool([schoolsCache[offset][0]]);
        }
      } else {
        const schoolsUrl = `${URL_SCHOOLS}?$limit=${LIMIT}&$offset=${offset}`;

        try {
          const response = await fetch(schoolsUrl);
          // const testResponse = await fetch(fetchURL);
          // const testData = await testResponse.json();
          // console.log({ testData });
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

    fetchSchoolsAndScores();
  }, [offset]);

  const handleSelectedSchool = index => {
    setSelectedSchool([currentSchools[index]]);
  };

  const handlePrevClick = () => {
    setOffset(Math.max(0, offset - LIMIT));
  };

  const handleNextClick = () => {
    setOffset(offset + LIMIT);
  };

  return (
    <div>
      <div className="dropdown-container">
        <Dropdown buttonValue="Cities *" filterValue={CITIES} />
        <Dropdown buttonValue="Students *" filterValue={TOTAL_STUDENTS} />
      </div>
      <div className="results-labels">
        <div>All Schools</div>
        <div>Filtered Schools</div>
      </div>
      <div className="schools-container">
        <div>
          {currentSchools.map((school, index) => (
            <School
              key={school.dbn}
              {...school}
              handleClick={() => handleSelectedSchool(index)}
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
