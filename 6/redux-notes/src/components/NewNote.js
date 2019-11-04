import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'

const NewNote = (props) => {
  console.log(createNote)
  console.log(props.createNote)
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const newNote = await noteService.createNew(content)
    props.createNote(newNote)
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

const mapDispatchToProps = dispatch => { 
  return { 
    createNote: value => { 
      dispatch(createNote(value)) 
    }, 
  } 
}

export default connect(
  null, // since parameter does not need to access store's state, we can pass the first paramater as null 
  mapDispatchToProps
)(NewNote)