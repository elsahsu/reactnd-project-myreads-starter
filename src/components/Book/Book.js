import React from 'react'

const book = (props) => {
    const cover_style = {
        width: 128,
        height: 193,
        backgroundImage: 'url(' + props.coverUrl +')',
        backgroundRepeat: 'no-repeat'
    };

    /* <img src={props.coverUrl} /> */
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={cover_style}></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => props.moveHandler(props.id, event.target.value)}>
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