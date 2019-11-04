import axios from 'axios'

const baseUrl = 'http://localhost:3003/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log("RESPONSE.DATA")
  console.log(response.data)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, important: false })
  return response.data
}

export default { getAll, createNew }