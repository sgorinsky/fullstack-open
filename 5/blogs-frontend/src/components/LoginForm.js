import React from 'react';
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ username, setUsername, password, setPassword, setUser, setNotification, setError, setBlogs }) => {
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem('loggedInBlogsUser', JSON.stringify(user));
            setUser(user);
            console.log(user)
            var blogs = await blogService.getAll();

            setBlogs(blogs)
            setUsername('')
            setPassword('')
            setNotification(`${user.username} logged in!`)
            
            setTimeout(() => {
                setNotification(null);
                setError(false);
            }, 1000)
            
        } catch (exception) {
            setError(true);
            setNotification('Wrong credentials');
            setTimeout(() => {
                setNotification(null);
                setError(false);
            }, 3000)
            
        }
    }
    return (
        <>
            <form onSubmit={handleLogin} className='login'>
                <div>
                    <h4> Blogs login </h4>
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