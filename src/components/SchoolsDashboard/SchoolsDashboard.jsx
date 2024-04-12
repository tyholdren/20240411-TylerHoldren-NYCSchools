import SchoolCard from '../SchoolCard/SchoolCard';
import { fetchSchoolsAndScores } from '../../services/schoolService';
import MultipleSelect from '../MultipleSelect/MultipleSelect';
import { useState, useEffect } from 'react';
import SelectedSchool from '../SelectedSchool/SelectedSchool';
import PageHeader from '../PageHeader/PageHeader';
import Box from '@mui/material/Box';

import List from '@mui/material/List';

import ScrollableList from '../ScrollableList/ScrollableList';

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
      if (selectedSchool === null) {
        return;
      }
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
      <Stack direction="row" sx={{ marginTop: '15px', marginBottom: '15px' }}>
        <MultipleSelect
          buttonValue="cities"
          filterValue={CITIES}
          updateView={() => setSelectedView(VIEW_OPTIONS[1])}
          fetchFilteredResults={handleCityFilterChange}
        />
        <MultipleSelect
          buttonValue="students"
          filterValue={TOTAL_STUDENTS}
          updateView={() => setSelectedView(VIEW_OPTIONS[1])}
          fetchFilteredResults={handleCityFilterChange}
        />
        <Button
          variant="contained"
          sx={{
            height: '40px',
            minHeight: '40px',
            alignSelf: 'center',
          }}
          onClick={() => setSelectedView(VIEW_OPTIONS[0])}
        >
          clear filters
        </Button>
      </Stack>
      <div className="schools-dashboard__content-container">
        <Stack direction="row">
          {VIEW_OPTIONS.map((view, index) => {
            return (
              <Box
                sx={{ marginRight: 4, marginBottom: 0 }}
                key={index}
                onClick={() => handleViewSelection(index)}
                className={
                  selectedView === view ? 'active-view' : 'non-active-view'
                }
              >
                {view}
              </Box>
            );
          })}
        </Stack>
        <div>
          <Stack direction="row">
            <Stack direction="column">
              <ScrollableList
                schools={currentSchools}
                handleSelectedSchool={handleSelectedSchool}
              ></ScrollableList>
              <div>
                <span>{`Results ${offset} - ${offset + 8}`}</span>
                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    sx={{ marginRight: 2 }}
                    variant="contained"
                    disabled={offset === 0}
                    onClick={handlePrevClick}
                  >
                    prev
                  </Button>

                  <Button
                    sx={{ marginRight: 2 }}
                    variant="contained"
                    onClick={handleNextClick}
                  >
                    next
                  </Button>
                  <PaginationSelect />
                </Stack>
              </div>
            </Stack>
            <Box>
              {selectedSchool.length > 0 && (
                <SelectedSchool {...selectedSchool[0]} />
              )}
            </Box>
          </Stack>
        </div>
      </div>
    </div>
  );
}
