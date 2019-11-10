import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import noteService from './services/notes'

import { initializeNotes } from './reducers/noteReducer'

import Notes from './components/Notes'
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'

const App = ( props ) => {
  useEffect(() => {
    noteService.getAll().then(notes =>
      props.initializeNotes(notes)
    )
  }, [props])
  return (
    <div>
      <NewNote  />
      <VisibilityFilter />
      <Notes  />
    </div>
  )
}


export default connect(null, { initializeNotes })(App)