import React, { useState } from 'react'
import { connect } from 'react-redux'


import { getBlogs, deleteBlog } from '../reducers/blogs'
import { clearAllNotifications, setSuccessNotification, setErrorNotification } from '../reducers/notifications'

import Togglable from './Togglable'
import Like from './Like'
import BlogForm from './BlogForm'

const Blog = ({ user, blog, blogs, getBlogs, deleteBlog, clearAllNotifications, setErrorNotification }) => {
    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    
    
    const showWhenVisible = { display: visible ? '' : 'none' }
    const id = user ? user.id : 'null'
    const author = user ? user.username : 'null'
    const showIfUser = { display: id ===  blog.user ||  blog.author === author ? '' : 'none' }
    const deletePost = async () => {
        try {
            const title = blog.title;
            if (window.confirm(`Are you sure you want to delete ${title}?`)) {
                deleteBlog(blog.id, user.token);
                setErrorNotification(`${title} deleted!`)
                setTimeout(() => {
                    clearAllNotifications()
                }, 2500)
            }
        } catch(error) {
            setErrorNotification(error)
            setTimeout(() => {
                clearAllNotifications()
            }, 4000)
        }
    }
    
    return (
        <div className='blog'>
            <div onClick={() => setVisible(!visible)}>
                <li className='title' > <h5>title: {blog.title}</h5></li>
                    <div style={showWhenVisible}>
                        <li className='author'> 
                            <h6>author: { blog.author}</h6>
                        </li>
                        <li className='body'>{ blog.body}</li>
                    </div>
                {likes + ' likes'}
            </div>
            <Like handleLikes={handleLikes} likeButton={likeButton} />
                        
            <div style={showIfUser}>
                <Togglable buttonLabel="edit?">
                    <BlogForm
                        blog={blog}
                        user={user}
                        blogs={blogs}
                        getBlogs={getBlogs}
                        PostNotPut={false}
                    />
                </Togglable>
                <button style={showIfUser} onClick={deletePost}>delete</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state, action) => {
    return {
        user: state.user,
        blogs: state.blogs,
    }
}

const mapDispatchToProps = {
    getBlogs,
    deleteBlog,
    setSuccessNotification,
    setErrorNotification,
    clearAllNotifications,
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog);