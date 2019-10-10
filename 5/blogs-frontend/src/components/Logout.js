import React from 'react';
import blogService from '../services/blogs'

const Logout = ({user, setUser, setError, setNotification, setBlogs}) => {
    return (
        <button onClick={async () => {
            const temp = user.username;
            setUser(null)
            window.localStorage.clear()
            const blogs = await blogService.getAll()
            setBlogs(blogs)
            setError(true);
            setNotification(`${temp} has logged out`)
            setTimeout(() => {
                setError(false);
                setNotification(null);
            }, 1000)
            
        }}> are you sure? </button>
    )
}
export default Logout