import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
const App = (props) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification store={props.store} />
      <AnecdoteForm store={props.store} />
      <AnecdoteList store={props.store} />
    </div>
  )
}

export default App