import { useState } from 'react';

function EditBookForm({ book, onSaveEdit, onCancel }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [rating, setRating] = useState(book.rating);

  function handleSubmit(e) {
    e.preventDefault();
    onSaveEdit(book.id, { title, author, rating: Number(rating) });
  }

  return (
    <form onSubmit={handleSubmit} className="book-card">
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input value={rating} onChange={(e) => setRating(e.target.value)} type="number" />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditBookForm;
