import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './components/SearchPage/SearchPage'
import BookShelf from './components/BookShelf/BookShelf'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount() {
    console.log('Mounted');
    let currentlyReading = [];
    let wantToRead = [];
    let read = [];

    BooksAPI.getAll().then(results => {
      console.log(results);
      results.forEach(book => {
        if (book.shelf === 'currentlyReading') {
          currentlyReading.push(book);
          console.log(book);
        } else if (book.shelf === 'wantToRead') {
          wantToRead.push(book);
        } else if (book.shelf === 'read') {
          read.push(book);
        }
      });
      this.setState({
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read
      });
    });
  }

  moveToShelf(book, shelf) {
    console.log('Move book' + book + ' to ' + shelf);
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title="Currently Reading"
                  moveHandler={this.moveToShelf}
                  books={this.state.currentlyReading} />
                <BookShelf
                  title="Want to Read"
                  moveHandler={this.moveToShelf}
                  books={this.state.wantToRead} />
                <BookShelf
                  title="Read"
                  moveHandler={this.moveToShelf}
                  books={this.state.read} />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
