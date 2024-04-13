import { useState, useEffect } from 'react';
import TooltipWrapper from '../TooltipWrapper/TooltipWrapper';
import MultipleSelect from '../MultipleSelect/MultipleSelect';
import SelectedSchool from '../SelectedSchool/SelectedSchool';
import PageHeader from '../PageHeader/PageHeader';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ScrollableList from '../ScrollableList/ScrollableList';

// NOTE: Modularized data fetching logic enhances maintainability and reusability across components
import { fetchSchoolsAndScores } from '../../services/schoolService';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// NOTE: Importing constants from a utilities file keeps static content centralized and easy to manage.
import {
  CITIES,
  TOTAL_STUDENTS,
  VIEW_OPTIONS,
  ERROR_MESSAGES,
  URLS,
  DEFAULT_FILTERS,
  DEFAULT_VIEW,
} from '../../utils/constants';
import PaginationSelect from '../PaginationSelect/PaginationSelect';

export default function SchoolsDashboard() {
  /*
   NOTE: We leverage the cache for data persistence to avoid 
  redundant API calls, thus optimizing performance and reducing data fetch time.
  */
  const [schoolsCache, setSchoolsCache] = useState({});
  const [currentSchools, setCurrentSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState([]);
  const [selectedView, setSelectedView] = useState(DEFAULT_VIEW);
  const [showTooltip, setShowTooltip] = useState(false);
  const [shouldClearFilter, setShouldClearFilter] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(8);

  const defaultFetchArgs = {
    cityFilter: filters.cityFilter,
    studentFilter: filters.studentFilter,
    setSchoolsCache,
    setCurrentSchools,
    setSelectedSchool,
    schoolsCache,
    offset,
    selectedSchool,
    baseURL: URLS.base,
    limit,
  };
  /*
  NOTE: Using pagination with a limit and offset reduces the number of items fetched at a time,
  minimizing API load and improving application performance.
  */

  /*
   NOTE: SQL queries within fetchSchoolsAndScores are constructed to request specific ranges of
   data (using limit and offset), resulting in faster query execution and lower memory consumption.
  */
  useEffect(() => {
    fetchSchoolsAndScores({
      ...defaultFetchArgs,
    });
  }, [offset, selectedSchool]);

  useEffect(() => {
    let timer;
    if (shouldClearFilter) {
      timer = setTimeout(() => {
        setShouldClearFilter(false);
      }, 3000);
    }

    // Clear timeout if the component is unmounted or the value of `shouldClearFilter` changes
    return () => clearTimeout(timer);
  }, [shouldClearFilter]);

  useEffect(() => {
    handleReset();
  }, [limit, shouldClearFilter]);
  /*
   NOTE: Implementing a hard reset to revert the app to its initial state ensures
   a consistent user experience and helps prevent state-related bugs.
  */
  const handleReset = () => {
    setSchoolsCache({});
    setCurrentSchools([]);
    setSelectedSchool([]);
    setSelectedView(DEFAULT_VIEW);
    setOffset(0);
    setFilters(DEFAULT_FILTERS);

    fetchSchoolsAndScores(defaultFetchArgs);
  };

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
    if (index !== 0 && filters.cityFilter === null) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
      return;
    }

    const viewOptionsName = Object.values(VIEW_OPTIONS).map(
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

  const handleCityFilterChange = newCity => {
    setFilters(previousFilters => ({
      ...previousFilters,
      cityFilter: newCity,
    }));
    fetchSchoolsAndScores({ ...defaultFetchArgs, cityFilter: newCity });
  };

  const handleStudentFilterChange = selectedRange => {
    let lowValue, highValue;

    // NOTE: If the selected range is '500+', set lowValue to 500 and highValue to an arbitrarily large number
    if (selectedRange === '500+') {
      lowValue = 500;
      highValue = 999999;
    } else {
      // For other ranges, split the string by hyphen to get low and high values
      [lowValue, highValue] = selectedRange.split('-').map(Number);
    }

    setFilters(previousFilters => ({
      ...previousFilters,
      studentFilter: [lowValue, highValue],
    }));
    fetchSchoolsAndScores({
      ...defaultFetchArgs,
      studentFilter: [lowValue, highValue],
    });
  };

  return (
    <div className="schools-dashboard">
      <PageHeader selectSchool={handleSelectedSchool} />
      <Stack direction="row" sx={{ marginTop: '15px', marginBottom: '15px' }}>
        <MultipleSelect
          selectionLabel="cities"
          filterValues={CITIES}
          clearFilter={shouldClearFilter}
          filters={filters}
          updateSelectedFilters={setFilters}
          updateTab={() => {
            setSelectedView(VIEW_OPTIONS.filteredSchools.filterName);
          }}
          fetchFilteredResults={handleCityFilterChange}
        />
        <MultipleSelect
          selectionLabel="students"
          filterValues={TOTAL_STUDENTS}
          clearFilter={shouldClearFilter}
          filters={filters}
          updateSelectedFilters={setFilters}
          updateTab={() =>
            setSelectedView(VIEW_OPTIONS.filteredSchools.filterName)
          }
          fetchFilteredResults={handleStudentFilterChange}
        />
        <Button
          variant="contained"
          sx={{
            height: '40px',
            minHeight: '40px',
            alignSelf: 'center',
          }}
          onClick={() => {
            setShouldClearFilter(true);
          }}
        >
          clear filters
        </Button>
      </Stack>
      <div className="schools-dashboard__content-container">
        <Stack direction="row">
          {Object.values(VIEW_OPTIONS).map(({ filterName }, index) => {
            return (
              <TooltipWrapper
                key={index}
                message={
                  index === 1
                    ? ERROR_MESSAGES.filteredError
                    : ERROR_MESSAGES.savedSchoolsError
                }
                /*
                NOTE: if we had more time, we could make more descriptive error messages and handle 
                them gracefully, at the moment error states are not persisting throughout app lifecycle, 
                with more time we would make this behavior consistent throughout entire session
                */
                open={showTooltip && index !== 0 && filters.cityFilter === null}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                arrow
              >
                <Box
                  sx={{ marginRight: 4, marginBottom: 0 }}
                  onClick={() => handleViewSelection(index, filters)}
                  className={
                    selectedView === filterName
                      ? 'active-view'
                      : 'non-active-view'
                  }
                >
                  <Typography variant="subtitle1" component="span">
                    {filterName}
                  </Typography>
                </Box>
              </TooltipWrapper>
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
