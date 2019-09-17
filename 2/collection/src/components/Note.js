import React from 'react'

const Note = ({note}) => <li key={note.id}> {note.content} </li>

export default Note