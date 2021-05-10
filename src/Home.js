import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import { getAll as getAllBooks, update } from './BooksAPI'

const Home = ({ props }) => {
  const [crntRead, setCrntRead] = useState([])
  const [wantRead, setWantRead] = useState([])
  const [read, setRead] = useState([])

  useEffect(() => {
    getAllBooks()
      .then(books => {
        setCrntRead(() => books.filter((book) => book.shelf === "currentlyReading"))
        setWantRead(() => books.filter((book) => book.shelf === "wantToRead"))
        setRead(() => books.filter((book) => book.shelf === "read"))
      })
  }, [])

  const updateShelfs = (newShelf, book) => {
    update(book, newShelf)
      .then(() => {
        if(newShelf !== book.shelf) {
          // delete
          if(book.shelf === "currentlyReading") {
            setCrntRead((oldShelf) => oldShelf.filter(b => b.id !== book.id))
            book.shelf = "none"
          } else if(book.shelf === "wantToRead") {
            setWantRead((oldShelf) => oldShelf.filter(b => b.id !== book.id))
            book.shelf = "none"
          } else if(book.shelf === "read") {
            setRead((oldShelf) => oldShelf.filter(b => b.id !== book.id))
            book.shelf = "none"
          }
          // add
          if(newShelf === "currentlyReading") {
            book.shelf = "currentlyReading"
            setCrntRead((oldShelf) => [...oldShelf, book])
          } else if(newShelf === "wantToRead") {
            book.shelf = "wantToRead"
            setWantRead((oldShelf) => [...oldShelf, book])
          } else if(newShelf === "read") {
            book.shelf = "read"
            setRead((oldShelf) => [...oldShelf, book])
          } else {
            book.shelf = "none"
          }
        }
      })
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf books={crntRead} shelfType="currentlyReading" updateShelfs={updateShelfs} />
          <BookShelf books={wantRead} shelfType="wantToRead" updateShelfs={updateShelfs} />
          <BookShelf books={read} shelfType="read" updateShelfs={updateShelfs} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
)};

export default Home;
