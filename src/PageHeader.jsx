export default function PageHeader() {
  return (
    <div>
      <label htmlFor="school-search">
        Find the school that best matches your needs
      </label>
      <input
        id="school-search"
        name="school-search"
        type="text"
        placeholder="Search by school name"
      />
    </div>
  );
}
