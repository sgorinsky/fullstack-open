import React from 'react'

const LoginForm = ({ setToken, setError }) => {
  const login = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={login}>
      <input></input>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm