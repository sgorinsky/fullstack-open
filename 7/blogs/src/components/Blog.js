import React, { useState } from 'react'
import { connect } from 'react-redux'

import refService from '../services/refs'
import blogService from '../services/blogs'
import { getBlogs } from '../reducers/blogs'
import userService from '../services/users'

import Togglable from './Togglable'
import Like from './Like'
import BlogForm from './BlogForm'

const Blog = ({ user, blog, blogs, getBlogs, setNotification, setError }) => {
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
                setNotification('Login to like a post');
                setError(true);
                setTimeout(() => {
                    setError(false);
                    setNotification(null);
                }, 1200)
            }
        } catch {
            setNotification('Error');
            setError(true);
            setTimeout(() => {
                setError(false);
                setNotification(null);
            }, 1200)
        }
            
    }
    const deletePost = async () => {
        const title =  blog.title;
        if (window.confirm(`Are you sure you want to delete ${title}?`)) {
            await blogService.remove( blog.id, user.token);
            const temps = await blogService.getAll();
            getBlogs(temps);
            setError(true);
            setNotification(`${title} deleted!`)

            setTimeout(() => {
                setError(false);
                setNotification(null)
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
                <Togglable buttonLabel="edit?" ref={refService.blogUpdateRef}>
                    <BlogForm
                        blog={blog}
                        user={user}
                        blogs={blogs}
                        getBlogs={getBlogs}
                        setNotification={setNotification}
                        setError={setError}
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
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog);