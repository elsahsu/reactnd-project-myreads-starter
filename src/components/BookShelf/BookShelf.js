import React from 'react'
import Book from '../Book/Book'

const bookShelf = (props) => {

  const books = props.books.map(book => 
    <li> <Book authors={book.authors} title={book.title} coverUrl={book.coverUrl} /> </li>
  );

  return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books}
          </ol>
        </div>
      </div>
  )
}

export default bookShelf;
