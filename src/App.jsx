import { useState, useEffect } from 'react'
import BookCard from './components/BookCard.jsx'
import AddBookForm from './components/AddBookForm.jsx'
import EditBookForm from './components/EditBookForm.jsx'
import './App.css'

function App() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  function getToken() {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'david' })
    })
      .then(response => response.json())
      .then(loginData => loginData.token);
  }

  function handleAddBook(newBook) {
    getToken()
      .then(token => fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newBook)
      }))
      .then(response => response.json())
      .then(createdBook => {
        setBooks([...books, createdBook]);
      });
  }

  function handleDeleteBook(id) {
    getToken()
      .then(token => fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      }))
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      });
  }

  function handleUpdateBook(id, updatedFields) {
    getToken()
      .then(token => fetch(`http://localhost:3000/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedFields)
      }))
      .then(() => {
        setBooks(books.map(book => book.id === id ? { ...book, ...updatedFields } : book));
        setEditingId(null);
      });
  }

  return (
    <div>
      <h1>My Book List</h1>
      <AddBookForm onAddBook={handleAddBook} />
      {books.map(book => (
        book.id === editingId ? (
          <EditBookForm
            key={book.id}
            book={book}
            onSaveEdit={handleUpdateBook}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            rating={book.rating}
            onDeleteBook={handleDeleteBook}
            onEditBook={setEditingId}
          />
        )
      ))}
    </div>
  );
}

export default App
