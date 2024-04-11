export default function SchoolCard({
  school_name,
  city,
  finalgrades,
  total_students,
  handleClick,
}) {
  return (
    <div className="school-container">
      <div className="data-A">
        <p>{school_name}</p>
        <p>Located in: {city}</p>
      </div>
      <div className="data-B">
        <p>Grades: {finalgrades}</p>
        <p>Students: {total_students}</p>
      </div>
      <button className="school-details-button" onClick={handleClick}>
        See More Info
      </button>
    </div>
  );
}
