import PageHeader from './PageHeader';
import SelectedSchool from './SelectedSchool';
import Schools from './Schools';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="platform-container">
        <h3>Find Your Best NY School</h3>
        <PageHeader />
        <Schools />
      </div>
    </div>
  );
}

export default App;
