import React from 'react'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'

const App = (props) => {

  return (
    <div>
      <AnecdoteForm store={props.store} />
      <Anecdotes store={props.store} />
    </div>
  )
}

export default App