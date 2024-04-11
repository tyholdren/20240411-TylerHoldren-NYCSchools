export default function SelectedSchool({
  schoolName,
  zip,
  city,
  stateCode,
  finalGrades,
  totalStudents,
  overview_paragraph,
  neighborhood,
  location,
  phone_number,
  school_email,
  website,
  academicopportunities1,
  academicopportunities2,
  school_sports,
  extracurricular_activities,
  attendance_rate,
  scores,
}) {
  const UNDEFINED_MESSAGE = 'N/A';

  return (
    <article className="school-container">
      <header className="school-header">
        <h1>{schoolName}</h1>
        <p>
          Located in: {city}, {stateCode}, {zip}
        </p>
      </header>
      <section className="school-details">
        <h2>Basic Information</h2>
        <p>Grades: {finalGrades}</p>
        <p>Students: {totalStudents || UNDEFINED_MESSAGE}</p>
        <p>Neighborhood: {neighborhood || UNDEFINED_MESSAGE}</p>
        <p>Location: {location || UNDEFINED_MESSAGE}</p>
        <p>Attendance rate: {attendance_rate || UNDEFINED_MESSAGE}</p>
      </section>
      <section className="sat-scores">
        <h2>SAT Scores</h2>
        <p>
          Number of Test Takers:{' '}
          {scores ? scores.num_of_sat_test_takers : UNDEFINED_MESSAGE}
        </p>
        <p>
          Reading Score:{' '}
          {scores ? scores.sat_critical_reading_avg_score : UNDEFINED_MESSAGE}
        </p>
        <p>
          Math Score: {scores ? scores.sat_math_avg_score : UNDEFINED_MESSAGE}
        </p>
        <p>
          Writing Score:{' '}
          {scores ? scores.sat_writing_avg_score : UNDEFINED_MESSAGE}
        </p>
      </section>
      <section className="contact-info">
        <h2>Contact Information</h2>
        <p>Phone: {phone_number || UNDEFINED_MESSAGE}</p>
        <p>Email: {school_email || UNDEFINED_MESSAGE}</p>
        <p>
          Website:{' '}
          {website ? (
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          ) : (
            UNDEFINED_MESSAGE
          )}
        </p>
      </section>
      <section className="additional-info">
        <h2>Additional Opportunities</h2>
        <ul>
          <li>{academicopportunities1 || UNDEFINED_MESSAGE}</li>
          <li>{academicopportunities2 || UNDEFINED_MESSAGE}</li>
        </ul>
        <p>Sports: {school_sports || UNDEFINED_MESSAGE}</p>
        <p>
          Extracurricular Activities:{' '}
          {extracurricular_activities || UNDEFINED_MESSAGE}
        </p>
      </section>
      <section className="school-overview">
        <h2>Who We Are</h2>
        <p>{overview_paragraph || UNDEFINED_MESSAGE}</p>
      </section>
    </article>
  );
}
