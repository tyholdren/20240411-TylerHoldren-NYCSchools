export default function SchoolCard({
  school_name,
  city,
  finalgrades,
  total_students,
  handleClick,
}) {
  return (
    <div className="school-card">
      <div className="school-card__info">
        <p className="school-card__name">{school_name}</p>
        <p className="school-card__location">Located in: {city}</p>
      </div>
      <div className="school-card__stats">
        <p className="school-card__grades">
          <strong>Grades:</strong> {finalgrades}
        </p>
        <p className="school-card__students">
          <strong>Students: </strong>
          {total_students}
        </p>
      </div>
      <button className="school-card__details-button" onClick={handleClick}>
        See More Info
      </button>
    </div>
  );
}
