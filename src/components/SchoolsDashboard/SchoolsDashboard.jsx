import SchoolCard from '../SchoolCard/SchoolCard';
import { fetchSchoolsAndScores } from '../../services/schoolService';
import MultipleSelect from '../MultipleSelect/MultipleSelect';
import { useState, useEffect } from 'react';
import SelectedSchool from '../SelectedSchool/SelectedSchool';
import PageHeader from '../PageHeader/PageHeader';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { CITIES, TOTAL_STUDENTS, VIEW_OPTIONS } from '../../utils/constants';
import PaginationSelect from '../PaginationSelect/PaginationSelect';

let BASE_URL = 'https://data.cityofnewyork.us/resource/s3k6-pzi2.json';
const LIMIT = 8;

export default function SchoolsDashboard() {
  const [schoolsCache, setSchoolsCache] = useState({});
  const [currentSchools, setCurrentSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState([]);
  const [selectedView, setSelectedView] = useState(VIEW_OPTIONS[0]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchSchoolsAndScores({
      cityFilter: null,
      setSchoolsCache,
      setCurrentSchools,
      setSelectedSchool,
      schoolsCache,
      offset,
      selectedSchool,
      BASE_URL,
      LIMIT,
    });
  }, [offset, selectedSchool]);

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
    fetchSchoolsAndScores({
      cityFilter,
      offset,
      setSchoolsCache,
      setCurrentSchools,
      setSelectedSchool,
      schoolsCache,
      selectedSchool,
    });
  };

  return (
    <div className="schools-dashboard">
      <PageHeader selectSchool={handleSelectedSchool} />
      <div className="schools-dashboard__dropdown-container">
        <MultipleSelect
          buttonValue="Cities"
          filterValue={CITIES}
          updateView={() => setSelectedView(VIEW_OPTIONS[1])}
          fetchFilteredResults={handleCityFilterChange}
        />
        <MultipleSelect
          buttonValue="Students"
          filterValue={TOTAL_STUDENTS}
          updateView={() => setSelectedView(VIEW_OPTIONS[1])}
          fetchFilteredResults={handleCityFilterChange}
        />
        <button onClick={() => setSelectedView(VIEW_OPTIONS[0])}>
          X Clear Filters
        </button>
      </div>

      <div className="schools-dashboard__content-container">
        <div className="schools-dashboard__view-options">
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
        <div className="schools-dashboard__content-container__primary">
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
      </div>
      <div className="schools-dashboard__pagination-container">
        <span>{`Results ${offset} - ${offset + 8}`}</span>
        <div className="pagination-container-buttons">
          <Stack spacing={2} direction="row"></Stack>
          <Button
            variant="contained"
            disabled={offset === 0}
            onClick={handlePrevClick}
          >
            prev
          </Button>
          <Button variant="contained" onClick={handleNextClick}>
            next
          </Button>

          <PaginationSelect></PaginationSelect>
        </div>
      </div>
    </div>
  );
}
