//Dependencies
import React, { useState, useEffect } from 'react';
import './App.css';
// Components
import Note from './components/Note';
import noteService from './components/notes'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('password');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, []) 

  useEffect(() => { 
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')    
    if (loggedUserJSON) { 
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      setToken(user.token) 
    } 
  }, [])
  
  // NOTES
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
  const rows = () => 
    notesToShow.map((note) => 
      <Note 
        key={note.id} 
        note={note} 
        toggleImportanceOf={() => toggleImportanceOf(note.id)}
      />
    );
  
  return (
    <div>
      <h1><em>Notes</em></h1>
      <Notification message={errorMessage} />
      {
        user === null ?
          <LoginForm 
            username={username} 
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            setUser={setUser}
            setToken={setToken}
            setErrorMessage={setErrorMessage}
          /> :
          <div>
            <p>
              {user.name} logged in
              <button onClick={
                () => {
                  setUsername('username')
                  setPassword('password')
                  setUser(null)
                  window.localStorage.clear()
                  console.log(window.localStorage)
              }}> 
                logout 
              </button>
            </p>
            <NoteForm 
              notes={notes}
              setNotes={setNotes}
              newNote={newNote}
              setNewNote={setNewNote}
              token={token}
              setErrorMessage={setErrorMessage}
            />
          </div>
      }
      

      <button 
        type="submit" 
        onClick={() => setShowAll(!showAll)}> 
          {showAll ? 'all notes shown': 'only important notes shown'}
      </button>

      <ul>
        {rows()}
      </ul>
      <Footer />
    </div>
  )
}

export default App;
