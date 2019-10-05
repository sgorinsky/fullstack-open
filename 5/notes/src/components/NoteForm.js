import React from 'react';
import noteService from './notes';

const NoteForm = ({ notes, setNotes, newNote, setNewNote, token, setErrorMessage }) => {

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    }

    const addNoteToCollection = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.45
        }

        noteService
            .create(noteObject, token)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('');
            })
            .catch(error => {
                setErrorMessage('Issue creating note');
                setTimeout(() => setErrorMessage(null), 4000);
            })
    }
    
    return (
        <>
            <form onSubmit={addNoteToCollection}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit"> save </button>
            </form>
        </>
    )
}

export default NoteForm;

