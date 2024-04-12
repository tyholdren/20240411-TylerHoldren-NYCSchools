import Container from '@mui/material/Container';
import SchoolsDashboard from './components/SchoolsDashboard/SchoolsDashboard';
import './styles/App.css';

function App() {
  return (
    <Container className="App">
      <h3>Search for NYC Schools</h3>
      <SchoolsDashboard />
    </Container>
  );
}

export default App;
