import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getBlogs, deleteBlog } from '../reducers/blogs'
import { clearAllNotifications, setSuccessNotification, setErrorNotification } from '../reducers/notifications'

import Togglable from './Togglable'
import Like from './Like'
import BlogForm from './BlogForm'

const Blog = ({ user, blog, blogs, deleteBlog, clearAllNotifications, setErrorNotification }) => {
    console.log(blog)
    const [visible, setVisible] = useState(false)    
    const showWhenVisible = { display: visible ? 'block' : 'none' }
    const showIfUser = { display: user && (blog.user === user.id || blog.author === user.username) ? '' : 'none' }

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
                <div className='title'>
                    <h5>{blog.title}</h5>
                </div>
                <div style={showWhenVisible}>
                    <h6>author: {blog.author}</h6>
                    <p className='body'>{blog.body}</p>
                </div>                
            </div>
            <Like blog={blog} /> {`${blog.likes} ${blog.likes === 1 ? 'like' : 'likes'}`}
                        
            <div style={showIfUser}>
                <Togglable buttonLabel="edit?">
                    <BlogForm
                        blog={blog}
                        blogs={blogs}
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
        user: state.users.user,
        blogs: state.blogs,
    }
}

const mapDispatchToProps = {
    deleteBlog,
    setSuccessNotification,
    setErrorNotification,
    clearAllNotifications,
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog);