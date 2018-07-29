import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Book from '../Book/Book'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    }
  }

  searchTextChanged(value) {
    console.log(value);
    if (!value) {
      this.setState({matches:[]});
      return;
    }
    BooksAPI.search(value).then((books) => {
      console.log(books);
      this.setState({matches: books});
    });
  }

  render () {
    const foundBooks = this.state.matches.map(book => (
      <li key={book.id}>
      <Book
        id={book.id}
        shelf="none"
        moveHandler={(shelf) => this.props.moveHandler(book, shelf)}
        title={book.title}
        authors={book.authors}
        coverUrl={book.imageLinks.thumbnail} />
       </li>
       )
    );

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              onChange={(event) => this.searchTextChanged(event.target.value)}
              placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
           {foundBooks}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;
