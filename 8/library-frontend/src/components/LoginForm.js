import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ token, setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token) // set browser cache
    }
  }, [result.data]) // eslint-disable-line

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      {!token || !localStorage.getItem('library-user-token') ?
        <form onSubmit={submit}>
          <div>
            username
            <input value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input value={password} type='password' onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type='submit'>login</button>
        </form> :
        'logged in!'
      }
    </div>
  )
}

export default LoginForm