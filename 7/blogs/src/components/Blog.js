import React, { useState } from 'react'
import { connect } from 'react-redux'


import { getBlogs, deleteBlog } from '../reducers/blogs'
import { clearAllNotifications, setSuccessNotification, setErrorNotification } from '../reducers/notifications'

import Togglable from './Togglable'
import Like from './Like'
import BlogForm from './BlogForm'

const Blog = ({ user, blog, blogs, getBlogs, deleteBlog, clearAllNotifications, setErrorNotification }) => {
    const [visible, setVisible] = useState(false)    
    
    const showWhenVisible = { display: visible ? 'block' : 'none' }
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
                <div className='title' > 
                    <h5>{blog.title}</h5>
                </div>
                <div style={showWhenVisible}>
                    <h6>author: {blog.author}</h6>
                    <p className='body'>{blog.body}</p>
                </div>                
            </div>
            <Like blog={blog} /> {`${blog.likes} ${blog.likes == 1 ? 'like' : 'likes'}`}
                        
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