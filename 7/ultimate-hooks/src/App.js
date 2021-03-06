  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    if (event.target) setValue(event.target.value)
    else setValue(event)
  }

  return {
    type,
    value,
    onChange
  }
}


const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  
  useEffect(() => {
    getAll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let token = '12345'

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
    return response.data
  }

  const get = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    setResources(resources.concat(response.data))
    return response.data
  }
  const create = async newObject => {
    setToken('12345')
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    setResources(resources.concat(response.data))
    return response.data
  }
  const update = async (id, newObject) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObject)
    setResources(resources.map(resource => {
      return id === resource.id ? request.data : resource
    }))
    return request.data
  }

  const service = {
    create,
    update,
    get,
    getAll, 
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    content.onChange('')
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    name.onChange('')
    number.onChange('')
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App