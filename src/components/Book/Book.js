import React from 'react'

const book = (props) => {
    const cover_style = {
        width: 128,
        height: 193,
        backgroundImage: 'url(' + props.coverUrl +')',
        backgroundRepeat: 'no-repeat'
    };

    let authorString = '';
    if (props.authors) {
        // book.authors.join(', ')
        authorString = props.authors.join(', ');
    }
    /* <img src={props.coverUrl} /> */
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={cover_style}></div>
          <div className="book-shelf-changer">
            <select
              value={props.shelf}
              onChange={(event) => props.moveHandler(event.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{authorString}</div>
      </div>
    )
}

export default book;