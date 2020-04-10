import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [addAuthor] = useMutation(ADD_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    const birthdate = Number(born)
    addAuthor({ variables: { name, born: birthdate } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name 
          <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born 
          <input value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default AuthorForm