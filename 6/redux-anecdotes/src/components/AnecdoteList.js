import React from 'react'
import Anecdote from './Anecdote'

import { upvote } from '../reducers/anecdoteReducer'
import { notificationSet, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const { anecdotes } = store.getState()

  const handleUpvote = (anecdote) => {
    return store.dispatch(upvote(anecdote.id)) 
      && store.dispatch(notificationSet(anecdote.content))
      && setTimeout(() => {
        return store.dispatch(notificationRemove())
      }, 2000)
  }
  return (
    <ul>
      {anecdotes
        .sort((first, next) => next.votes - first.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleUpvote(anecdote)}
          />
        )
      }
    </ul>
  )
}

export default AnecdoteList