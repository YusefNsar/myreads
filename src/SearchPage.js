import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAll as getAllBooks, search, update } from './BooksAPI';


const SearchPage = () => {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState([])
  const [badQuery, setBadQuery] = useState(false)

  // the data of books in my shelfs
  let myBooks = useRef([])

  useEffect(() => {
    getAllBooks()
      .then((allBooks) => myBooks.current = allBooks)
  }, [])

  useEffect(() => {
    let debounce = setTimeout(() => {
      search(query.trim()).then(serverBooks => {
        if (serverBooks && serverBooks.error !== "empty query") {
          const searchBooks = serverBooks.map((sBook) => {
            const myBook = myBooks.current.find(mBook => mBook.id === sBook.id)
            if (myBook) {
              sBook.shelf = myBook.shelf
            } else {
              sBook.shelf = "none"
            }
            return sBook
          })
          setBooks(searchBooks)
        } else {
          setBooks([])
          if (query.length !== 0) {
            setBadQuery(true)
          }
        }
      })
    }, 300)

    return () => {
      clearTimeout(debounce)
    }
  }, [query])

  const handleChange = (e) => {
    setBadQuery(false)
    setQuery(e.target.value)
  }

  const updateShelfs = (newShelf, book) => {
    update(book, newShelf)
      .then(() => {
        book.shelf = newShelf;
      })
  }
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            autoFocus
            value={query}
            onChange={handleChange}
            style={badQuery? { outline: "3px solid hsl(0, 100%, 60%)" } : {}}
            />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {
          books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ backgroundImage: book.imageLinks? `url(${book.imageLinks.smallThumbnail})` : "none" }}></div>
                  <div className="book-shelf-changer">
                    <select defaultValue={book.shelf} onChange={(e) => updateShelfs(e.target.value, book)}>
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
  );
}

export default SearchPage;
