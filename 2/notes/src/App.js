import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import noteService from './components/notes'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 12,
    backgroundColor: 'darkred',
    position: 'relative',
    top:"100px",
    paddingLeft:"10px",
    borderRadius: 4
  }

  return (
    <div style={footerStyle} className='footer'>
      <br />
      <em>Department of Computer Science, University of Helsinki 2019</em>
    </div>
  )
}

const App = () => {
  console.log()
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // useEffect is a way of executing code synchronously
  // if the second arg is [], then it only executes the code once
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, []) 
  
  console.log('render', notes.length, 'notes')
  
  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote) // put request
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => { 
        setErrorMessage(`Note ${note.id} was already removed from the server`);
        setTimeout( () => setErrorMessage(null), 4000);
        setNotes(notes.filter(n => n.id !== id));       
      })
    
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)
  const rows = () => notesToShow.map((note) => <Note key={note.id} note={note} toggleImportanceOf={() => toggleImportanceOf(note.id)}/>);
  
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

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  // this function is event listener that always logs the state of the form input
  const handleNoteChange = (event) => { 
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button type="submit" onClick={() => setShowAll(!showAll)}> {showAll ? 'all notes shown': 'only important notes shown'} </button>
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

      <Footer />
    </div>
  )
}

export default App;
