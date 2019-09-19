import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import axios from 'axios'

const App = () => {
  console.log()
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  // useEffect is a way of executing code synchronously
  // if the second arg is [], then it only executes the code once
  useEffect(() => {
    console.log('effect')

    const eventHandler = response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    }

    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)
  }, []) 
  
  console.log('render', notes.length, 'notes')
  
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)
  const rows = () => notesToShow.map((note) => <Note key={note.id} note={note} />);
  
  /* we create a new note object from the form input and create a new note
  that we add to the collection of notes when we hit submit */
  const addNoteToCollection = (event) => { 
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.45,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject));
    setNewNote('');
  }

  // this function is event listener that always logs the state of the form input
  const handleNoteChange = (event) => { 
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <p>{showAll ? 'all notes shown' : 'important notes only' }</p>
      <button type="submit" onClick={() => setShowAll(!showAll)}> toggle showAll </button>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNoteToCollection}>
        <input 
          value={newNote} 
          onChange={handleNoteChange 
            /* everytime we change the input, we change the newNote value to the 
            form's input */ } 
        />       
        <button type="submit"> save </button>
      </form>
    </div>
  )
}

export default App;
