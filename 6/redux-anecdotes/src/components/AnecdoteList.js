import React from 'react'

import Anecdote from './Anecdote'

import { upvote } from '../reducers/anecdoteReducer'
import { notificationSet, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState()
  console.log(store.getState())
  console.log(filter)
  const showAnecdotes = (entireList, filter='') => {
    return entireList
      .sort((first, next) => next.votes - first.votes)
      .map(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()) ?
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleUpvote(anecdote)}
        /> : ''
      )
  }
  const anecdotesToShow = !filter.type ? showAnecdotes(anecdotes, filter) : showAnecdotes(anecdotes, '')
  
  const handleUpvote = (anecdote) => {
    return store.dispatch(upvote(anecdote.id)) 
      && store.dispatch(notificationSet(anecdote.content))
      && setTimeout(() => {
        return store.dispatch(notificationRemove())
      }, 5000)
  }
  return (
    <ul>
      {anecdotesToShow}
    </ul>
  )
}

export default AnecdoteList