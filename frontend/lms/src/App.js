import Landing from './containers/landing';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import Books from './containers/books';
import BookDetails from './containers/bookDetails';


function App() {
  return (
    <div className="App overflow-hidden">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/books" element={<Books/>} />
          <Route path="/books/book/:book_id" element={<BookDetails/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

