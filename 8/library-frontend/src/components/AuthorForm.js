import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [createAuthor] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createAuthor({ variables: { name, born } })

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