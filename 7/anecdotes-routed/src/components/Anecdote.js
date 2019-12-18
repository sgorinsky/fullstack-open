import React from 'react';

const Anecdote = ({ anecdote }) => {
  return (
    <>
      <h2>{anecdote.author}</h2>
      <li>{anecdote.content}</li>
      <li>{anecdote.info}</li>
    </>
  )
}

export default Anecdote;