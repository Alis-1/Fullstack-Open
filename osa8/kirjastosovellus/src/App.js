import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import AddBook from './components/AddBook';
import EditAuthor from './components/EditAuthor';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/authors">Authors</Link>
          <Link to="/books">Books</Link>
          <Link to="/add-book">Add Book</Link>
          <Link to="/edit-author">Edit Author</Link>
        </nav>
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-author" element={<EditAuthor />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
