import React from 'react';
import PropTypes from 'prop-types';

const BookShelf = ({ books, shelfType, updateShelfs }) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfType}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
        {
          books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ backgroundImage: book.imageLinks? `url(${book.imageLinks.smallThumbnail})` : "none" }}></div>
                  <div className="book-shelf-changer">
                    <select defaultValue={shelfType} onChange={(e) => updateShelfs(e.target.value, book)}>
                      <option value="move" disabled>CHOOSE SHELF...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors? book.authors.map((author, index) => {
                  if(index !== book.authors.length-1) {
                    return author+", "
                  } else {
                    return author
                  }
                }) : (<small>no authors</small>)}</div>
              </div>
            </li>
          ))
        }
        </ol>
      </div>
    </div>
  )
};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfType: PropTypes.string.isRequired,
  updateShelfs: PropTypes.func.isRequired
}

export default BookShelf;
