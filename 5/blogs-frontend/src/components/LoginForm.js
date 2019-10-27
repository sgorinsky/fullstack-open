import React from 'react';
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ usernameField, passwordField, setUser, setNotification, setError, setBlogs }) => {
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                "username": usernameField.value, "password": passwordField.value
            })
            window.localStorage.setItem('loggedInBlogsUser', JSON.stringify(user));
            setUser(user);
            var blogs = await blogService.getAll();
            setBlogs(blogs)
            usernameField.reset()
            passwordField.reset()
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
                    <input { ...usernameField } reset='nothing' />
                </div>
                <div>
                    password
                    <input { ...passwordField } reset='nothing'/>
                </div>
                <button type="submit"> login </button>
            </form>
        </>
    )
}

export default LoginForm