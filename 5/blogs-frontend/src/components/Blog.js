import React, { useState } from 'react' 
import blogService from '../services/blogs'
import userService from '../services/users'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import refService from '../services/refs'

const Blog = ({ blog, blogs, setBlogs, setNotification, setError, user, setUser }) => {
    const [visible, setVisible] = useState(false);
    const [likes, setLikes] = useState(blog.likes)
    const [likeButton, setLikeButton] = useState(user && user.hasOwnProperty('likedBlogs') && user.likedBlogs.hasOwnProperty(blog.id))
    const showWhenVisible = { display: visible ? '' : 'none' }
    const id = user ? user.id : 'null'
    const author = user ? user.username : 'null'
    
    const blogRef = React.createRef();
    const showIfUser = { display: id ===  blog.user ||  blog.author === author ? '' : 'none' }

    const handleLikes = async () => { 
        try {
            const currentUserLikes = user && user.hasOwnProperty('likedBlogs') ? user.likedBlogs : {};
            const currentBlogLikes = blog && blog.hasOwnProperty('usersLiked') ? blog.usersLiked : {};

            if (user && !currentUserLikes.hasOwnProperty(blog.id)) {
                currentBlogLikes[user.id]=true;

                setLikeButton(!likeButton)
                setLikes(Object.keys(currentBlogLikes).length)
                await blogService.update(blog.id, { likes, usersLiked: currentBlogLikes })
                const currentUser = user
                currentUserLikes[blog.id] = true;
                currentUser.likedBlogs = currentUserLikes;
                await userService.update(user.id, { likes: currentUserLikes })
                setUser(currentUser);
            } else if (user) {
                delete currentBlogLikes[user.id]
                setLikeButton(!likeButton)
                setLikes(Object.keys(currentBlogLikes).length)
                await blogService.update(blog.id, { likes, usersLiked: currentBlogLikes })
                console.log('unlike:1')
                const currentUser = user
                console.log(currentUser)
                delete currentUser.likedBlogs[blog.id];
                console.log('unlike:2')
                console.log(currentUser)
                setUser(currentUser);
                console.log(user);
                await userService.update(user.id, { likes: currentUser.likedBlogs })
                
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
            <li className='title' onClick={() => setVisible(!visible)}> <h5>title: { blog.title}</h5></li>
            <div style={showWhenVisible}>
                <li className='author'> <h6>author: { blog.author}</h6></li>
                <li className='body'>{ blog.body}</li>
                {likes + ' likes' } 
                <button onClick={handleLikes}>
                    {likeButton ? 'unlike' : 'like'}
                </button>
            </div>
            
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