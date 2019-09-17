import React from 'react';
import logo from './logo.svg';
import './App.css';
import Note from './components/Note'

const App = ({ notes }) => {
  const rows = () => notes.map(note => <li key={note.id}> {note.id}: {note.content} </li>);

  //let's try another version of the map function we're trying to display
  var count = 1; // using count as id for incrementing within jsx
  const result = notes.map((note) => <li key={note.id}> {count++}: {note.content} </li>);
  console.log(result);
  console.log(result[0]);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        Calling the map method on notes directly in jsx:
                {notes.map(note => <li key={note.id}>{note.id}: {note.content}</li>)}
        {/* in order to call map function on notes, we need to wrap it in curly braces */}
        <br></br>
        Calling the rows() function:
                {rows() /* or we can call it here */}
        <br></br>
        Result array directly from invoking the map method on notes:
                {result}
        <br></br>
        <strong>After we've exported Note.js from components and imported it</strong>
        {notes.map(note => <Note key={note.id} note={note} />)/* specifying key for each note */}

      </ul>
    </div>
  )
}

export default App;
