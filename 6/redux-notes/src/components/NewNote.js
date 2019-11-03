import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {
  console.log(createNote)
  console.log(props.createNote)
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    props.createNote(content)
    event.target.note.value = ''
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