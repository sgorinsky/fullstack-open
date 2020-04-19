import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, setError }) => {
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
      localStorage.setItem('phonenumbers-user-token', token) // set browser cache
    }
  }, [result.data]) // eslint-disable-line

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input value={username} onChange={({ target }) => setUsername(target.value)} />
        <input value={password} type='password' onChange={({ target }) => setPassword(target.value)} />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm