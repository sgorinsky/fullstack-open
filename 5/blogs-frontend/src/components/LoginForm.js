import React from 'react';
import loginService from '../services/login'

const LoginForm = ({ username, setUsername, password, setPassword, setUser, setToken, setNotification, error, setError }) => {
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            });
            console.log(user);
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
            setToken(user.token);
            setUser(user.username);
            setUsername('');
            setPassword('');
        } catch (exception) {
            console.log(exception);
            console.log(error);
            setError(true);
            console.log(error);
            setNotification('Wrong credentials');
            setTimeout(() => {
                setNotification(null);
                setError(false);
            }, 3000)
            
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
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit"> login </button>
            </form>
        </>
    )
}

export default LoginForm