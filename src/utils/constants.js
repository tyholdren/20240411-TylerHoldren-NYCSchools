export const CITIES = [
  'Astoria',
  'Bayside',
  'Bellerose',
  'Bronx',
  'Brooklyn',
  'Cambria Heights',
  'Corona',
  'Elmnhurst',
  'Far Rockaway',
  'Flushing',
  'Forest Hills',
  'Fresh Meadows',
  'Hollis',
  'Jamaica',
  'Long Island City',
  'Manhattan',
  'Oakland Gardens',
  'Ozone Park',
  'Queens Village',
  'Richmond Hill',
  'Ridgewood',
  'Rockaway Park',
  'Saint Albans',
  'South Ozone Park',
  'South Richmond Hill',
  'Springfield Gardens',
  'Staten Island',
];

export const DEFAULT_FILTERS = {
  cityFilter: null,
  studentFilter: null,
};

export const TOTAL_STUDENTS = [
  '1-100',
  '100-200',
  '200-300',
  '300-400',
  '400-500',
  '500+',
];

export const VIEW_OPTIONS = {
  allSchools: { filterName: 'All schools', errorMessage: null },
  filteredSchools: {
    filterName: 'Filtered schools',
    errorMessage:
      "You haven't selected any filters. Please select a filter to enable view.",
  },
  mySavedSchools: {
    filterName: 'My saved schools',
    errorMessage:
      "You haven't saved any schools yet. Please save schools to enable view.",
  },
};

export const DEFAULT_VIEW = VIEW_OPTIONS.allSchools.filterName;

export const ERROR_MESSAGES = {
  filteredError: 'Please select a filter first',
  savedSchoolsError: 'Saved searches ability is coming soon!',
};

export const URLS = {
  base: 'https://data.cityofnewyork.us/resource/s3k6-pzi2.json',
  scores: 'https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=',
};

export const PAGE_SIZES = [5, 10, 15, 20];
