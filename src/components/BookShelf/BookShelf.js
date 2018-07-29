import React from 'react'
import Book from '../Book/Book'

const bookShelf = (props) => {

  const books = props.books.map(book => 
    <li key={book.id}>
      <Book
        id={book.id}
        shelf={book.shelf}
        moveHandler={(shelf) => {
          console.log('Move to ' + shelf);
          props.moveHandler(book, shelf)
        }}
        authors={book.authors}
        title={book.title}
        coverUrl={book.imageLinks.thumbnail} />
    </li>
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
