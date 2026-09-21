import { useState } from 'react';

function AddBookForm({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddBook({ title, author, rating: Number(rating) });
    setTitle('');
    setAuthor('');
    setRating('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      <input
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating"
        type="number"
      />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBookForm;
