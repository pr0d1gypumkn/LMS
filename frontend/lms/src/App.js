import logo from './logo.svg';
import Landing from './containers/landing';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';


function App() {

  
  return (
    <div className="App overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

