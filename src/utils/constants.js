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

export const TOTAL_STUDENTS = [
  '1-100',
  '100-200',
  '200-300',
  '300-400',
  '400-500',
  '500+',
];

export const VIEW_OPTIONS_2 = [
  'All schools',
  'Filtered schools',
  'My saved schools',
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
