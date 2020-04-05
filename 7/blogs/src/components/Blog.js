import React from 'react'
import { connect } from 'react-redux'

import { deleteBlog } from '../reducers/blogs'
import { clearAllNotifications, setSuccessNotification, setErrorNotification } from '../reducers/notifications'

import BlogForm from './BlogForm'
import CommentForm from './CommentForm'
import Like from './Like'
import Togglable from './Togglable'

const Blog = ({ user, blog, blogs, deleteBlog, clearAllNotifications, setErrorNotification }) => {  
    const showIfUser = { display: user && (blog.user === user.id || blog.author === user.username) ? '' : 'none' }

    if (!blog) {
        return null
    }

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
        <div className='container'>
            <div>
                <h5>{blog.title}</h5>
            </div>
            <div>
                <h6>author: {blog.author}</h6>
                <p>{blog.body}</p>
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
                <button className='btn btn-link' style={showIfUser} onClick={deletePost}>delete</button>
            </div>
            <CommentForm blog={blog} />
            {blog.comments && blog.comments.map((c, idx) => <li key={`${blog.id} ${idx}`}>{c}</li>)}
        </div>
    )
}

const mapStateToProps = (state) => {
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