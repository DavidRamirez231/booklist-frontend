import { useState, useEffect } from 'react'
import BookCard from './components/BookCard.jsx'
import AddBookForm from './components/AddBookForm.jsx'
import './App.css'

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  function handleAddBook(newBook) {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'david' })
    })
      .then(response => response.json())
      .then(loginData => {
        return fetch('http://localhost:3000/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginData.token}`
          },
          body: JSON.stringify(newBook)
        });
      })
      .then(response => response.json())
      .then(createdBook => {
        setBooks([...books, createdBook]);
      });
  }

  function handleDeleteBook(id) {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'david' })
    })
      .then(response => response.json())
      .then(loginData => {
        return fetch(`http://localhost:3000/books/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${loginData.token}`
          }
        });
      })
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      });
  }

  return (
    <div>
      <h1>My Book List</h1>
      <AddBookForm onAddBook={handleAddBook} />
      {books.map(book => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          rating={book.rating}
          onDeleteBook={handleDeleteBook}
        />
      ))}
    </div>
  );
}

export default App
