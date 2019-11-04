const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      console.log('DID WE MAKE IT?')
      console.log(action)
      return action.data
    case 'UPVOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}
export const createAnecdote = ({ content }) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0
    }
  }
}

export const upvote = (id) => {
  return {
    type: 'UPVOTE',
    data: { id }
  }
}

export default anecdoteReducer