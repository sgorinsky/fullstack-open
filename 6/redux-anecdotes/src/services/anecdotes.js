import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
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

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { get, getAll, update, createNew, }