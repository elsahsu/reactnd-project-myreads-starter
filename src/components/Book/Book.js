import React from 'react'

const book = (props) => {
    const cover_style = {
        width: 128,
        height: 193,
        backgroundImage: 'url(' + props.coverUrl +')'
    };

    return (
        <div className="book">
        <div className="book-top">
          <div className="book-cover" style={cover_style}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.authors}</div>
      </div>
    )
}

export default book;