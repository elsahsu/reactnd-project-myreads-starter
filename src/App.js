import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './components/SearchPage/SearchPage'
import BookShelf from './components/BookShelf/BookShelf'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelvedBooks: [],
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
      // console.log(results);
      results.forEach(book => {
        if (book.shelf === 'currentlyReading') {
          currentlyReading.push(book);
          // console.log(book);
        } else if (book.shelf === 'wantToRead') {
          wantToRead.push(book);
        } else if (book.shelf === 'read') {
          read.push(book);
        }
      });
      this.setState({
        shelvedBooks: results,
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read
      });
    });
  }

  /* Move book fron current shelf to target shelf (if they are different) */
  moveToShelf = (book, shelf) => {
    console.log(this);
    const currentShelfName = book.shelf;
    const targetShelfName = shelf;
    if (currentShelfName === targetShelfName) {
      console.log('Book ' + book.id + ' already in ' + targetShelfName);
    } else {
      console.log('Move book ' + book.id + ' from ' + currentShelfName + ' to ' + targetShelfName);
      book.shelf = shelf;
      let newState = {}
      // Remove book from current shelf (if it is in one)
      if (currentShelfName && currentShelfName !== 'none') {
        const currentShelf = this.state[currentShelfName].filter((shelfBook) => book.id !== shelfBook.id);
        newState[currentShelfName] = currentShelf;
      }

      // Add book to target shelf (if defined)
      if (targetShelfName && targetShelfName !== 'none') {
        const targetShelf = this.state[targetShelfName].concat([book]);
        newState[targetShelfName] = targetShelf;
      }
      this.setState(newState);
      BooksAPI.update(book, shelf);
    }
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchPage moveHandler={this.moveToShelf} shelvedBooks={this.state.shelvedBooks} />
        )} />
        <Route exact path="/" render={() => (
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
              <Link to="/search">Add a book</Link>
            </div>
          </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
