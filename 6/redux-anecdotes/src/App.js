import React from 'react'
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'

const App = (props) => {

  return (
    <div>
      <NewAnecdote store={props.store} />
      <Anecdotes store={props.store} />
    </div>
  )
}

export default App