import React, { useState } from 'react'

const Note = ({note, toggleImportanceOf}) => {
    const label = note.important
        ? 'make not important' : 'make important';
    
    return (
        <li key={note.id} className='note'>
            {note.content + ' '}
            <button onClick={() => toggleImportanceOf(note)}> {label} </button>
        </li>
    )

}
export default Note