export default function School({
  schoolName,
  city,
  finalGrades,
  totalStudents,
  handleClick,
}) {
  return (
    <div className="school-container">
      <div className="data-A">
        <div>{schoolName}</div>
        <div>Located in: {city}</div>
      </div>
      <div className="data-B">
        <div>Grades: {finalGrades}</div>
        <div>Students: {totalStudents}</div>
      </div>
      <button onClick={handleClick}>See More Info</button>
    </div>
  );
}
