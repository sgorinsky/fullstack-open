import React, { useState } from 'react';
import './App.css';
import Note from './components/Note';

const Show = ({show}) => {
  return (
    <h3>Are we showing all notes? { show + '' } </h3>
  )
}
const App = ({ notes }) => {
  console.log()
  const [collection, setCollection] = useState([...notes]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  
  const notesToShow = showAll ? collection : collection.filter((note) => note.important)
  const rows = () => notesToShow.map((note) => <Note key={note.id} note={note} />);
  
  /* we create a new note object from the form input and create a new note
  that we add to the collection of notes when we hit submit */
  const addNoteToCollection = (event) => { 
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.45,
      id: collection.length + 1,
    }

    setCollection(collection.concat(noteObject));
    setNewNote('');
  }

  // this function is event listener that always logs the state of the form input
  const handleNoteChange = (event) => { 
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <p>{!showAll ? 'important notes only' : 'all notes shown'}</p>
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
