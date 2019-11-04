const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
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


const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createAnecdote = ({ content }) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0,
      id: generateId()
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