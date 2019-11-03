import React from 'react'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'

const App = ({ store }) => {
  return (
    <div>
      <NewNote  />
      <VisibilityFilter />
      <Notes  />
    </div>
  )
}


export default App