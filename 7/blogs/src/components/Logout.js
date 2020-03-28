import React from 'react';
import { connect } from 'react-redux'

import { initializeBlogs } from '../reducers/blogs'

const Logout = ({user, setUser, setError, setNotification, setBlogs, initializeBlogs}) => {
    return (
        <button onClick={async () => {
            const temp = user.username;
            setUser(null)
            window.localStorage.clear()
            const blogs = initializeBlogs()
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

const mapDispatchToProps = {
    initializeBlogs,
}

export default connect(null, mapDispatchToProps)(Logout)