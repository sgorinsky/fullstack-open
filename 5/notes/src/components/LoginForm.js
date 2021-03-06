import React from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types';

const LoginForm = ({ username, password, setUsername, setPassword, setUser, setToken, setErrorMessage  }) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
            setToken(user.token)
            setUser(user)
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
            <form onSubmit={(event) => {
                handleLogin(event);
            }
            }>
                <div>
                    <h3> Login </h3>
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
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

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}
export default LoginForm;