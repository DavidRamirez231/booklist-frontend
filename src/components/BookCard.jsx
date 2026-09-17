function BookCard({ title, author, rating }) {
  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p>by {author}</p>
      <p>Rating: {rating}</p>
    </div>
  );
}

export default BookCard;
