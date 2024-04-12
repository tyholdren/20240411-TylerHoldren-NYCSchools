import { URLS } from '../utils/constants';

export const fetchSchoolsAndScores = async ({
  cityFilter,
  studentFilter,
  offset,
  setSchoolsCache,
  setCurrentSchools,
  setSelectedSchool,
  schoolsCache,
  selectedSchool,
  limit,
}) => {
  // NOTE: Constructing the base URL using limit and offset allows for efficient pagination without over-fetching.
  let baseURL = `${URLS.base}?$limit=${limit}&$offset=${offset}`;

  // Initialize an array to hold query conditions
  let queryCondition = '';

  /*
  NOTE: Currently, we filter either by city or by the number of students due to time constraints. 
  In the future, combining both filters could provide more precise results.
  */
  if (cityFilter) {
    queryCondition = `city='${encodeURIComponent(cityFilter)}'`;
  } else if (studentFilter) {
    const [minStudents, maxStudents] = studentFilter;
    queryCondition = `total_students between ${minStudents} and ${maxStudents}`;
  }

  // If there are any query conditions, append them to the base URL
  if (queryCondition) {
    baseURL += `&$where=${queryCondition}`;
  }

  /*
  NOTE: Utilizing a cache to avoid redundant API calls for previously fetched data, 
  which improves performance and reduces unnecessary network traffic.
  */
  if (schoolsCache[offset] && !cityFilter && !studentFilter) {
    setCurrentSchools(schoolsCache[offset]);
    // NOTE: Initializing the page with the first school on load to provide immediate context to the user.
    if (selectedSchool !== undefined && selectedSchool.length === 0) {
      setSelectedSchool([schoolsCache[offset][0]]);
    }
  } else {
    try {
      const schoolsResponse = await fetch(baseURL);
      const schoolsData = await schoolsResponse.json();

      /*
      NOTE: Promise.all is used to wait for all SAT score fetches to complete, 
      ensuring that the UI is updated with complete data.
      */
      const schoolsWithScores = await Promise.all(
        schoolsData.map(async school => {
          const scoresResponse = await fetch(`${URLS.scores}${school.dbn}`);
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
  /*
  NOTE: In the future, optimizing to fetch SAT scores only for the selected 
  school would further reduce API load and improve response times.
  */
};
