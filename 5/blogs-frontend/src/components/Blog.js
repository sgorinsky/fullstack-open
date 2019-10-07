import React, { useState } from 'react' 
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Blog = ({blog, setBlogs, setNotification, setError, user}) => {
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateBody, setUpdateBody] = useState('');
    const [visible, setVisible] = useState(false);
    const [likes, setLikes] = useState(blog.likes)
    const showWhenVisible = { display: visible ? '' : 'none' }
    const id = user ? user.id : 'null'
    const author = user ? user.username : 'null'
    
    const blogRef = React.createRef();
    const showIfUser = { display: id === blog.user || blog.author === author ? '' : 'none' }

    const updateBlog = async () => {
        const title = blog.title;
        try {
            await blogService.update(blog.id, { title: updateTitle, body: updateBody })
            const temps = await blogService.getAll();
            setBlogs(temps);
            setNotification(`${title} updated!`)

            setTimeout(() => {
                setNotification(null)
            }, 2500)
        } catch {
            setError(true);
            setNotification(`error updating ${title}`)

            setTimeout(() => {
                setError(false);
                setNotification(null)
            }, 2500)
        }
        
    }
    const handleLikes = async () => {
        setLikes(likes+1)
        await blogService.update(blog.id, {likes: likes})
    }
    const deletePost = async () => {
        const title = blog.title;
        if (window.confirm(`Are you sure you want to delete ${title}?`)) {
            await blogService.remove(blog.id, user.token);
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
            <li className='title' onClick={() => setVisible(!visible)}> <h5>title: {blog.title}</h5></li>
            <div style={showWhenVisible}>
                <li className='author'> <h6>author: {blog.author}</h6></li>
                <li className='body'>{blog.body}</li>
                {likes + ' likes' } <button onClick={handleLikes}>like</button>
            </div>
            
            <div style={showIfUser}>
                <Togglable buttonLabel="edit?" ref={blogRef}>
                    <BlogForm
                        handleBlog={updateBlog}
                        title={updateTitle}
                        setTitle={setUpdateTitle}
                        body={updateBody}
                        setBody={setUpdateBody}
                    />
                </Togglable>
                <button style={showIfUser} onClick={deletePost}>delete</button>
            </div>
            
        </div>
    )
}

export default Blog;