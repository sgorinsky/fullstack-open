import React from 'react';

const Anecdote = ({ anecdote }) => {
  
  let author = ''
  let content = ''
  let info = ''
  
  if (anecdote) {
    author = anecdote.author ? anecdote.author : ''
    content = anecdote.content ? anecdote.content : ''
    info = anecdote.info ? anecdote.info : ''
  }

  return (
    <>
      <h2>{author}</h2>
      {content}
      <br></br>
      <a href={info} target='blank'>{info}</a>
    </>
  )
}

export default Anecdote;
