import React from 'react'
import Anecdote from './Anecdote'

import { toggleImportanceOf } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
  const { anecdotes } = store.getState()

  return (
    <ul>
      {anecdotes
        .sort((first, next) => next.votes - first.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() =>
              store.dispatch(toggleImportanceOf(anecdote.id))
            }
          />
        )
      }
    </ul>
  )
}

export default AnecdoteList