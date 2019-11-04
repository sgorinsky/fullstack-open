import React from 'react'
import { connect } from 'react-redux'

import Anecdote from './Anecdote'

import { upvote } from '../reducers/anecdoteReducer'
import { notificationSet, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const currentFilter = !props.filter.type ? props.filter : ''

  const handleUpvote = (anecdote) => {
    return props.upvote(anecdote.id)
      && props.notificationSet(anecdote.content)
      && setTimeout(() => {
        return props.notificationRemove()
      }, 5000)
  }
  return (
    <ul>
      {props.visibleAnecdotes
        .map(anecdote => anecdote.content.toLowerCase().includes(currentFilter.toLowerCase()) ?
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleUpvote(anecdote)}
          /> : ''
        )
      }
    </ul>
  )
}

const showAnecdotes = ({ anecdotes }) => {
  return anecdotes.sort((first, next) => next.votes - first.votes)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: showAnecdotes(state),
    filter: state.filter
  }
}
const mapDispatchToProps = {
  upvote,
  notificationSet,
  notificationRemove
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)