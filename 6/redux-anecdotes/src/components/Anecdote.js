import React from 'react'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content}
      <br></br>
      <strong>{`has ${anecdote.votes} votes `}</strong>
      <button onClick={handleClick}> upvote </button>
    </li>
  )
}

export default Anecdote