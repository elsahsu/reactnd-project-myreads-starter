import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Book from '../Book/Book'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      matches: []
    }
  }

  searchTextChanged(value) {
    if (!value) {
      this.setState({searchString: '', matches:[]});
      console.log('No search term');
      return;
    }

    console.log(value);
    this.setState({searchString: value.trim()});
    BooksAPI.search(value)
      .then((books) => {
        // console.log(books);
        if (books.error) {
          console.log(books.error)
          this.setState({matches: []});
        } else {
          this.setState({matches: books});
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({matches: []});
      });
  }

  /* Search results do not contain shelf information so need to check if this book is
     already on some shelf. */
  getShelf(book) {
    if (book.shelf) {
      return book.shelf;
    }
    let shelf = 'none'
    this.props.shelvedBooks.forEach(
      function(shelvedBook) {
        if (shelvedBook.id === book.id) {
          console.log('Found book ' + book.title + ' in shelf ' + shelvedBook.shelf);
          shelf = shelvedBook.shelf;
        }
      }
    );
    return shelf;
  }

  render () {
    let foundBooks = '';
    let foundString = 'No results found';
    if (this.state.matches) {
        const count = this.state.matches.length;
        if (count > 0) {
            foundString = 'Showing ' + count + ' results';
        }
        foundBooks = this.state.matches.map(book => (
          <li key={book.id}>
            <Book
              id={book.id}
              shelf={this.getShelf(book)}
              moveHandler={(shelf) => this.props.moveHandler(book, shelf)}
              title={book.title}
              authors={book.authors}
              coverUrl={book.imageLinks ? book.imageLinks.thumbnail : ''} />
           </li>
         )
      );
    }

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
              value={this.state.searchString}
              onChange={(event) => this.searchTextChanged(event.target.value)}
              placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <div> {foundString} </div>
          <ol className="books-grid">
           {foundBooks}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;
