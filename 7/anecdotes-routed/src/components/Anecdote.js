import React from 'react'

const Anecdote = ({ anecdote }) => {
    return (
        <li key={anecdote.id} >{anecdote.content}</li>
    )
}

export default Anecdote