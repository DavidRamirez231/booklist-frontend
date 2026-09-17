import { useState, useEffect } from 'react'
import BookCard from './components/BookCard.jsx'
import './App.css'

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div>
      <h1>My Book List</h1>
      {books.map(book => (
        <BookCard key={book.id} title={book.title} author={book.author} rating={book.rating} />
      ))}
    </div>
  );
}

export default App
