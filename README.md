Prompt: 

REQUIREMENTS:

The app requirements are rather high-level and vague. If details are omitted, it is because we will be happy with a wide variety of functional solutions. Feel free to be creative and impress with code and UX (see more details down). You are allowed to use all online resources you can find and any 3rd party library if desired. Remember to make it useful for an actual user/student.

Create a web app (preferably React and Typescript) to provide information on NYC High schools.

Display a list of NYC High Schools.
Get your data here: https://data.cityofnewyork.us/Education/DOE-High-School-Directory-2017/s3k6-pzi2
Check this api - https://data.cityofnewyork.us/resource/s3k6-pzi2.json
Selecting a school should show additional information about the school
Display all the SAT scores - include Math, Reading and Writing.
SAT data here: https://data.cityofnewyork.us/Education/SAT-Results/f9bf-2cp4
It is up to you to decide what additional information to display.
In order to prevent you from running down rabbit holes that are less important to us, try to prioritize the following:

What is Important

Meet the basic App requirements.
The App should work like it would in production – error handling, edge conditions, stability and speed is important.
Well-constructed, easy-to-follow, commented code (especially comment hacks or workarounds made in the interest of expediency (i.e. // given more time I would prefer to wrap this in a blah blah blah pattern blah blah )).
Proper architecture with separation of concerns and best-practice patterns.
Modern asynchronous programming techniques.
What is Less Important

Demonstrating technologies or techniques you are not already familiar with.
Only add code which you want us to read and evaluate.
Bonus Points!

Good UX and UI
Samples of Unit testing. Examples of types of tests you would write rather than 100% code coverage.
Demonstrate understanding of development with accessibility in mind: samples of code that address one or more WCAG principles and/or a specific WCAG checkpoint. We are not looking for a complete coverage, but rather for a sample of ADA compliant code.



Things to still complete: 

- custom pagination, currently its hard-coded
- have search results be abosulutely positions, they're currently moving the rest of the UI
- same with filtering options
- allow user to save list of schools
- user can navigate to saved view
- simple visual alignments in UI
- accessiblility, ARIA, etc...
- error handling, how to communicate error states to users
- add comments to justify layout decisions
- basic unit testing
- render blank states if user has no saved searches
- allow user to save filtered queries
- break CSS into separate files, accompanying .jsx files in their respective components folder
- if possible, convert to TypeScript for increased error catching

Done: 
- implemented caching, so if we ever move backwards in pagination we pull from the cache not re-fetching data
- leverage limit + offset capabilities built in to API
- debounced API calls every 500 ms when searching for schools by name, reducing API calls
- can filter by city (will implement the same for school size)
- can select to view more info on a particular school from the search bar and the list views
- for the most part, semantic UI elements, can imporove upon





