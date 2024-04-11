import PageHeader from './PageHeader';
import SelectedSchool from './SelectedSchool';
import SchoolsDashboard from './SchoolsDashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="platform-container">
        <h3>Find Your Best NY School</h3>
        <PageHeader />
        <SchoolsDashboard />
      </div>
    </div>
  );
}

export default App;
