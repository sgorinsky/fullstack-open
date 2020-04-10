import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_AUTHOR, EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorForm = ({ isAddAuthor = true, setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const [addAuthor] = useMutation(ADD_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    const birthdate = Number(born)
    if (isAddAuthor) {
      addAuthor({ variables: { name, born: birthdate } })
    } else {
      editAuthor({ variables: { name, born: birthdate } })
    }

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>{isAddAuthor ? 'create new' : 'change author birthdate'}</h2>
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
        <button type='submit'>{isAddAuthor ? 'add!' : 'edit!'}</button>
      </form>
    </div>
  )
}

export default AuthorForm