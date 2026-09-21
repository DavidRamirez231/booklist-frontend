function BookCard({ id, title, author, rating, onDeleteBook }) {
  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p>by {author}</p>
      <p>Rating: {rating}</p>
      <button onClick={() => onDeleteBook(id)}>Delete</button>
    </div>
  );
}

export default BookCard;
