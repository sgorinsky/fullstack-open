import React from 'react'
import Anecdote from './Anecdote'

import { toggleImportanceOf } from '../reducers/anecdoteReducer'

const Anecdotes = ({ store }) => {
  return (
    <ul>
      {store.getState().map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            store.dispatch(toggleImportanceOf(anecdote.id))
          }
        />
      )}
    </ul>
  )
}

export default Anecdotes