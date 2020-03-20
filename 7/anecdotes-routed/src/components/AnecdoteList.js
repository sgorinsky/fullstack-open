import React from 'react'

import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes, setAnecdotes }) => {

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    console.log(anecdotes)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote =>
          <>
            <li key={anecdote.id}>
              <Link to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </li>
            {`${anecdote.votes} votes `} 
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </>
      )}
      </ul>
    </div>
  )
}


export default AnecdoteList