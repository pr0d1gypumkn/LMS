import Landing from './containers/landing';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import Books from './containers/books';


function App() {

  
  return (
    <div className="App overflow-hidden">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/books" element={<Books/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

