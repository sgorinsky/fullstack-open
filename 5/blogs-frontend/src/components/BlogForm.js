import React, { useState } from 'react';
import blogService from '../services/blogs'

const BlogForm = ({ user, blogs, setBlogs, setNotification, setError }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [likes, setLikes] = useState(0);

    const handleBlog = async (event) => {
        event.preventDefault();
        try {
            const newBlog = {
                title: title, 
                body: body, 
                author: user.username, 
                likes: likes, 
                user: user.id}
            const response = await blogService.create(newBlog, user.token);
            setBlogs(blogs.concat(response));
            setNotification(`${title} created by ${user.username}!`);
            setTitle('');
            setBody('');
            setTimeout(() => {
                setNotification(null);
            }, 1500)
        } catch (error) {
            setError(true);
            setNotification('Include all fields when creating new blog');
            setTimeout(() => {
                setError(false);
                setNotification(null);
            }, 3000)
        }
    }

    return (
        <form onSubmit={handleBlog}>
            <div>
                title
                <input
                    type='text'
                    value={title}
                    onChange={({target}) => setTitle(target.value)}
                    name='title'
                />
            </div>
            
            <div>
                content
                <input
                    type='text'
                    value={body}
                    onChange={({target}) => setBody(target.value)}
                    name='body'
                />
            </div>
            <button type='submit'>submit</button>
        </form>
    )
}
export default BlogForm;