import React from 'react'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import VisibilityFilter from './components/VisibilityFilter'

const App = ({ store }) => {
  return (
    <div>
      <NewNote store={store} />
      <VisibilityFilter store={store}/>
      <Notes store={store} />
    </div>
  )
}


export default App