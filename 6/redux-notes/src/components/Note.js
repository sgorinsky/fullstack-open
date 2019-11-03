import React from 'react'

const Note = ({ note, handleClick }) => {
  return (
    <li>
      {note.content}
      <strong>{` ${note.important ? 'important' : ''}`}</strong>
      <button onClick={handleClick}> {note.important ? 'turn off' : 'turn on' }</button>
    </li>
  )
}

export default Note