import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('RESPONSE.DATA')
  console.log(response.data)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = { 
    content, 
    votes: 0,
    id: generateId()
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

export default { getAll, createNew }