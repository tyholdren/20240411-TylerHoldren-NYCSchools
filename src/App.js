import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SchoolsDashboard from './components/SchoolsDashboard/SchoolsDashboard';
import './styles/App.css';

// use container if we want it to have margins

function App() {
  return (
    <Container className="App">
      <h3>Find Your Best NY School</h3>
      <SchoolsDashboard />
    </Container>
  );
}

export default App;
