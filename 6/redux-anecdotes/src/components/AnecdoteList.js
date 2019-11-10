import React from 'react'
import { connect } from 'react-redux'

import Anecdote from './Anecdote'

import { upvote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const currentFilter = !props.filter.type ? props.filter : ''

  const handleUpvote = (anecdote) => {
    return props.upvote(anecdote).then(() => {
      props.setNotification(anecdote.content, 3)
    })
  }
  return (
    <ul>
      {props.anecdotes
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
    anecdotes: showAnecdotes(state),
    filter: state.filter
  }
}
const mapDispatchToProps = {
  upvote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)