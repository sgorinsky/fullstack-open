import React from 'react';
import loginService from '../services/login'

const LoginForm = ({ username, setUsername, password, setPassword, setUser, setToken, setErrorMessage }) => {
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            setToken(user.token)
            setUser(user.username)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    return (
        <>
            <form onSubmit={handleLogin}>
                <div>
                    <h3> Login </h3>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit"> login </button>
            </form>
        </>
    )
}

export default LoginForm