The app will be available at `http://localhost:3000`.

## Project Requirements:

## Priorities

- **Fulfilling App Requirements**: The application adheres to the given high-level requirements, ensuring core functionality.
- **Production-Grade Readiness**: It's built with a focus on error handling, edge case coverage, and application stability.
- **Code Quality**: The source code is well-structured, commented, and easy to follow, showcasing best practices in software architecture.
- **Modern Asynchronous Patterns**: The app demonstrates the use of modern JavaScript async patterns and API interaction.

## Bonus Features

- **UI/UX Design**: The interface is designed to be both user-friendly and aesthetically pleasing.
- **Testing**: Sample unit tests are included to show test planning and execution strategy.
- **Accessibility**: Code snippets are provided that demonstrate adherence to one or more WCAG principles, showing a commitment to inclusivity.

## Project Status

## Achievements and Core Functionalities

In the development of the NYC High Schools Information App, several key features and optimizations were successfully implemented to enhance user experience and application performance:

- **Caching Implementation**: Caching of fetched results was implemented to reduce future API calls, with the storage of results locally for quick retrieval.
- **API Efficiency**: The app leverages the API's limit and offset parameters, fetching only a necessary subset of results to minimize data transmission and improve performance.
- **Optimized Page Load**: Initial page load time was reduced by loading only a few results to begin with, optimizing the time to interactive.
- **Offset-Based Pagination**: Pagination allows users to navigate through results incrementally, controlling the number of items they wish to see, including predefined pagination sizes for user convenience.
- **Search Functionality**: Users can search schools by name with API-supported filtering, enhancing the relevance of results.
- **Debouncing**: MUI components with built-in debouncing reduce the frequency of API calls during user search input, resulting in a smoother user experience.
- **Consistent Codebase**: A utils file stores static data, promoting consistency across the codebase and facilitating easier debugging.
- **Styled Components**: CSS is kept minimal by employing Styled Components, providing encapsulated styles for components and reducing the need for extensive global style sheets.
- **Comprehensive Filtering**: Users can filter schools by student body size or by city, with results fetched accordingly from the API.
- **Detailed School Information**: A separate window displays extensive information about a selected school, including "see details" functionality in the results panel and autocomplete search bar.
- **Clear Filters**: Users can reset applied filters, restoring the application to its initial state, enhancing usability.
- **User Navigation**: Tabs inform users about the current view, whether it's all schools, filtered schools, or other categories, improving the navigational experience.
- **User Feedback**: When users attempt to access filtered or saved schools views without appropriate criteria, tooltips provide feedback and guide them accordingly.

## Areas for Enhancement

The application serves its intended purpose effectively, but there are areas earmarked for future improvements:

- **Selective SAT Data Fetching**: Optimizing to fetch SAT data only for the selected school, reducing unnecessary data retrieval and improving load times.
- **Save School Feature**: Introducing functionality for users to save schools of interest and view them conveniently.
- **Custom Pagination Input**: Allowing users to input custom pagination sizes beyond preset options for a more personalized experience.
- **Expanded User Interface**: Considering a navigation panel for additional features or views that might enhance user interaction.
- **Combined Filters**: Aiming to implement joint filtering by cities and student size for more refined search results.
- **Informed Pagination System**: Fetching the total number of items from the API initially to facilitate a more accurate pagination system for the user.
- **School Data Comparison**: Enabling comparison of selected schools' data with visual tools like graphs for an analytical perspective.

## Testing Strategy

If afforded more time, the following areas would be prioritized for testing to ensure accuracy and reliability:

- **Filter Functionality**: Ensuring that filters are correctly applied and returning accurate results.
- **Pagination Accuracy**: Confirming the consistency of pagination with the number of results returned.
- **Tab Interaction**: Verifying that tabs respond appropriately when selected or deselected.
- **Effectiveness of Clear Filters**: Testing that the clear filters action is effectively resetting the application state each time it's triggered.

These prospective enhancements and testing protocols are envisioned with a dedication to advancing the application's utility and user satisfaction.

## Setup Instructions

To review the application:

1. Clone the repository from GitHub.
2. Install project dependencies with `npm install`.
3. Start the development server using `npm start`.
4. The app will launch in your default browser at `localhost:3000`.

## Contribution

Feel free to fork the project, make changes, and submit a pull request. Your contributions are always welcome!
