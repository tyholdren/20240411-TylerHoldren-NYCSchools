const URL_SCHOOLS = 'https://data.cityofnewyork.us/resource/s3k6-pzi2.json';
const URL_SCORES = 'https://data.cityofnewyork.us/resource/f9bf-2cp4.json?dbn=';
const LIMIT = 5;

export const fetchSchoolsAndScores = async ({
  cityFilter,
  offset,
  setSchoolsCache,
  setCurrentSchools,
  setSelectedSchool,
  schoolsCache,
  selectedSchool,
}) => {
  // Construct the base URL with limit and offset
  let baseURL = `${URL_SCHOOLS}?$limit=${LIMIT}&$offset=${offset}`;

  // Append the city filter if one is provided
  if (cityFilter) {
    baseURL += `&city=${encodeURIComponent(cityFilter)}`;
  }

  if (schoolsCache[offset] && !cityFilter) {
    setCurrentSchools(schoolsCache[offset]);
    if (selectedSchool !== undefined && selectedSchool.length === 0) {
      setSelectedSchool([schoolsCache[offset][0]]);
    }
  } else {
    // Fetch new data from the API
    try {
      const schoolsResponse = await fetch(baseURL);
      const schoolsData = await schoolsResponse.json();

      // Get SAT scores for each school
      const schoolsWithScores = await Promise.all(
        schoolsData.map(async school => {
          const scoresResponse = await fetch(`${URL_SCORES}${school.dbn}`);
          const scoresData = await scoresResponse.json();
          return {
            ...school,
            scores: scoresData.length ? scoresData[0] : null,
          };
        })
      );

      // Update cache and current schools state
      const updatedCache = { ...schoolsCache, [offset]: schoolsWithScores };
      setSchoolsCache(updatedCache);
      setCurrentSchools(schoolsWithScores);

      // Set selected school if it's not already set
      if (selectedSchool.length === 0) {
        setSelectedSchool([schoolsWithScores[0]]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};
