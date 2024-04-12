import { useState, useEffect } from 'react';
import { fetchSchoolsAndScores } from '../../services/schoolService';
import TooltipWrapper from '../TooltipWrapper/TooltipWrapper';
import MultipleSelect from '../MultipleSelect/MultipleSelect';
import SelectedSchool from '../SelectedSchool/SelectedSchool';
import PageHeader from '../PageHeader/PageHeader';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ScrollableList from '../ScrollableList/ScrollableList';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import {
  CITIES,
  TOTAL_STUDENTS,
  VIEW_OPTIONS,
  VIEW_OPTIONS_2,
} from '../../utils/constants';
import PaginationSelect from '../PaginationSelect/PaginationSelect';

let BASE_URL = 'https://data.cityofnewyork.us/resource/s3k6-pzi2.json';

export default function SchoolsDashboard() {
  const DEFAULT_VIEW = VIEW_OPTIONS_2.allSchools.filterName;

  const [schoolsCache, setSchoolsCache] = useState({});
  const [currentSchools, setCurrentSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState([]);
  const [selectedView, setSelectedView] = useState(DEFAULT_VIEW);
  const [showTooltip, setShowTooltip] = useState(false);
  const [filters, setFilters] = useState({
    cities: null,
    studentFilter: null,
  });

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(8);

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
      limit,
    });
  }, [offset, selectedSchool]);

  useEffect(() => {
    setSchoolsCache({});
    setCurrentSchools([]);
    setSelectedSchool([]);
    setSelectedView(DEFAULT_VIEW);
    setOffset(0);

    fetchSchoolsAndScores({
      cityFilter: null,
      setSchoolsCache,
      setCurrentSchools,
      setSelectedSchool,
      schoolsCache,
      offset,
      selectedSchool,
      BASE_URL,
      limit,
    });
  }, [limit]);

  const handleLimitChange = number => {
    setLimit(number);
  };

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

  const handleViewSelection = (index, filters) => {
    if (index !== 0 && filters.cities === null) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }
    const viewOptionsName = Object.values(VIEW_OPTIONS_2).map(
      value => value.filterName
    );

    setSelectedView(viewOptionsName[index]);
  };

  const handlePrevClick = () => {
    setOffset(Math.max(0, offset - limit));
  };

  const handleNextClick = () => {
    setOffset(offset + limit);
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
      limit,
    });
  };

  return (
    <div className="schools-dashboard">
      <PageHeader selectSchool={handleSelectedSchool} />
      <Stack direction="row" sx={{ marginTop: '15px', marginBottom: '15px' }}>
        <MultipleSelect
          buttonValue="cities"
          filterValue={CITIES}
          filters={filters}
          updateSelectedFilters={setFilters}
          updateView={() =>
            setSelectedView(VIEW_OPTIONS_2.allSchools.filterName)
          }
          fetchFilteredResults={handleCityFilterChange}
        />
        <MultipleSelect
          buttonValue="students"
          filterValue={TOTAL_STUDENTS}
          filters={filters}
          updateSelectedFilters={setFilters}
          updateView={() =>
            setSelectedView(VIEW_OPTIONS_2.allSchools.filterName)
          }
          fetchFilteredResults={handleCityFilterChange}
        />
        <Button
          variant="contained"
          sx={{
            height: '40px',
            minHeight: '40px',
            alignSelf: 'center',
          }}
          onClick={() => setSelectedView(DEFAULT_VIEW)}
        >
          clear filters
        </Button>
      </Stack>
      <div className="schools-dashboard__content-container">
        <Stack direction="row">
          {VIEW_OPTIONS.map((view, index) => (
            <TooltipWrapper
              key={index}
              message="Please select a city filter first"
              open={showTooltip && index !== 0 && filters.cities === null}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              arrow
            >
              <Box
                sx={{ marginRight: 4, marginBottom: 0 }}
                onClick={() => handleViewSelection(index, filters)}
                className={
                  selectedView === view ? 'active-view' : 'non-active-view'
                }
              >
                <Typography variant="subtitle1" component="span">
                  {view}
                </Typography>
              </Box>
            </TooltipWrapper>
          ))}
        </Stack>
        <div>
          <Stack direction="row">
            <Stack direction="column">
              <ScrollableList
                schools={currentSchools}
                handleSelectedSchool={handleSelectedSchool}
              ></ScrollableList>
              <div>
                <span>{`Results ${offset} - ${offset + limit}`}</span>
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
                  <PaginationSelect handleLimitChange={handleLimitChange} />
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
