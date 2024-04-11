export default function School({
  school_name,
  city,
  finalgrades,
  total_students,
  handleClick,
}) {
  return (
    <div className="school-container">
      <div className="data-A">
        <div>{school_name}</div>
        <div>Located in: {city}</div>
      </div>
      <div className="data-B">
        <div>Grades: {finalgrades}</div>
        <div>Students: {total_students}</div>
      </div>
      <button onClick={handleClick}>See More Info</button>
    </div>
  );
}
