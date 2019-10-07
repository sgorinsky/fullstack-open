import React, { useState } from 'react' 
import blogService from '../services/blogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blog = ({blog, blogs, setBlogs, setNotification, setError, user}) => {
    const [visible, setVisible] = useState(false);
    const [likes, setLikes] = useState( blog.likes)
    
    const showWhenVisible = { display: visible ? '' : 'none' }
    const id = user ? user.id : 'null'
    const author = user ? user.username : 'null'
    
    const blogRef = React.createRef();
    const showIfUser = { display: id ===  blog.user ||  blog.author === author ? '' : 'none' }

    const handleLikes = async () => {
        setLikes(likes+1)
        await blogService.update( blog.id, {likes: likes})
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
                {likes + ' likes' } <button onClick={handleLikes}>like</button>
            </div>
            
            <div style={showIfUser}>
                <Togglable buttonLabel="edit?">
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