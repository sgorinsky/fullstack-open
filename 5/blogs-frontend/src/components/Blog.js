import React, { useState, useEffect } from 'react'

import refService from '../services/refs'
import blogService from '../services/blogs'
import userService from '../services/users'

import Togglable from './Togglable'
import Like from './Like'
import BlogForm from './BlogForm'

const Blog = ({ blog, blogs, setBlogs, setNotification, setError, user, setUser }) => {
    const [likeButton, setLikeButton] = useState(user && user.hasOwnProperty('likedBlogs') && user.likedBlogs.hasOwnProperty(blog.id))
    useEffect(() => {
        const loadIn = async () => {
            console.log('CURRENT USER')
            console.log(user)
            const initialBlogs = await blogService.getAll()
            console.log('DOES IT?')
            console.log(user && user.likedBlogs.hasOwnProperty(blog.id))
            setBlogs(initialBlogs);

        }
        loadIn()
    }, []);
    
    const [visible, setVisible] = useState(false);
    const [likes, setLikes] = useState(blog.likes)
    
    
    const showWhenVisible = { display: visible ? '' : 'none' }
    const id = user ? user.id : 'null'
    const author = user ? user.username : 'null'
    const showIfUser = { display: id ===  blog.user ||  blog.author === author ? '' : 'none' }

    const handleLikes = async () => { 
        try {
            const currentUserLikes = user && user.hasOwnProperty('likedBlogs') ? user.likedBlogs : {};
            const currentBlogLikes = blog && blog.hasOwnProperty('usersLiked') ? blog.usersLiked : {};
            console.log(currentBlogLikes)
            if (user && !currentUserLikes.hasOwnProperty(blog.id)) {
                currentBlogLikes[user.id]=true;
                console.log('LIKE')
                console.log(user)
                console.log(currentBlogLikes)
                setLikeButton(!likeButton)
                setLikes(Object.keys(currentBlogLikes).length)
                await blogService.update(blog.id, { likes: Object.keys(currentBlogLikes).length, usersLiked: currentBlogLikes })
                const currentUser = user
                currentUserLikes[blog.id] = true;
                currentUser.likedBlogs = currentUserLikes;
                await userService.update(user.id, { likedBlogs: currentUserLikes })
                setUser(currentUser);
            } else if (user) {
                delete currentBlogLikes[user.id]
                console.log('UNLIKE')
                setLikeButton(!likeButton)
                setLikes(Object.keys(currentBlogLikes).length)
                await blogService.update(blog.id, { likes: Object.keys(currentBlogLikes).length, usersLiked: currentBlogLikes })
                console.log('unlike:1')
                const currentUser = user
                console.log(currentUser)
                delete currentUser.likedBlogs[blog.id];
                console.log('unlike:2')
                console.log(currentUser)
                setUser(currentUser);
                console.log(user);
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
            setBlogs(temps);
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
            <li className='title' > <h5>title: { blog.title}</h5></li>
            <div style={showWhenVisible}>
                <li className='author'> <h6>author: { blog.author}</h6></li>
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
                        setBlogs={setBlogs}
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

export default Blog;