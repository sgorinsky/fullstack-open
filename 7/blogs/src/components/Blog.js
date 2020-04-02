import React, { useState } from 'react'
import { connect } from 'react-redux'


import { getBlogs, deleteBlog } from '../reducers/blogs'
import { clearAllNotifications, setSuccessNotification, setErrorNotification } from '../reducers/notifications'

import blogService from '../services/blogs'
import userService from '../services/users'

import Togglable from './Togglable'
import Like from './Like'
import BlogForm from './BlogForm'

const Blog = ({ user, blog, blogs, getBlogs, deleteBlog, clearAllNotifications, setSuccessNotification, setErrorNotification }) => {
    const [likeButton, setLikeButton] = useState(user && user.hasOwnProperty('likedBlogs') && user.likedBlogs.hasOwnProperty(blog.id))
    
    const [visible, setVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    
    
    const showWhenVisible = { display: visible ? '' : 'none' }
    const id = user ? user.id : 'null'
    const author = user ? user.username : 'null'
    const showIfUser = { display: id ===  blog.user ||  blog.author === author ? '' : 'none' }

    const handleLikes = async () => { 
        try {
            const currentUserLikes = user && user.hasOwnProperty('likedBlogs') ? user.likedBlogs : {};
            const currentBlogLikes = blog && blog.hasOwnProperty('usersLiked') ? blog.usersLiked : {};
            if (user && !currentUserLikes.hasOwnProperty(blog.id)) {
                currentBlogLikes[user.id]=true;
                setLikeButton(!likeButton)
                setLikes(Object.keys(currentBlogLikes).length)
                await blogService.update(blog.id, { likes: Object.keys(currentBlogLikes).length, usersLiked: currentBlogLikes })
                const currentUser = user
                currentUserLikes[blog.id] = true;
                currentUser.likedBlogs = currentUserLikes;
                await userService.update(user.id, { likedBlogs: currentUserLikes })
            } else if (user) {
                delete currentBlogLikes[user.id]
                setLikeButton(!likeButton)
                setLikes(Object.keys(currentBlogLikes).length)
                await blogService.update(blog.id, { likes: Object.keys(currentBlogLikes).length, usersLiked: currentBlogLikes })
                const currentUser = user
                delete currentUser.likedBlogs[blog.id];
                await userService.update(user.id, { likedBlogs: currentUser.likedBlogs })
            } else {
                setErrorNotification('Login to like a post');
                setTimeout(() => {
                    clearAllNotifications(null);
                }, 1200)
            }
        } catch {
            setErrorNotification('Error');
            setTimeout(() => {
                clearAllNotifications()
            }, 1200)
        }
            
    }
    const deletePost = async () => {
        const title =  blog.title;
        if (window.confirm(`Are you sure you want to delete ${title}?`)) {

            deleteBlog(blog.id, user.token);
            setErrorNotification(`${title} deleted!`)

            setTimeout(() => {
                clearAllNotifications()
            }, 2500)
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