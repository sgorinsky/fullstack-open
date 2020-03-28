import React, { useState } from 'react';
import blogService from '../services/blogs'
import refService from '../services/refs'

const BlogForm = ({ user, blogs, setBlogs, setNotification, setError, blog='', PostNotPut=true }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleBlog = async (event) => {
        event.preventDefault();
        try {
            const newBlog = {
                title: title,
                body: body,
                author:  user.username,
                likes: 0,
                user:  user.id
            }
            
            const response = await blogService.create(newBlog, user.token);
            setBlogs(blogs.concat(response));
            setNotification(`${title} created by ${ user.username}!`);
            setTitle('');
            setBody('');
            setTimeout(() => {
                setNotification(null);
            }, 1500)

        } catch {
            setError(true);
            setNotification(`error posting ${title}`)

            setTimeout(() => {
                setError(false);
                setNotification(null)
            }, 2500)
        }
    }

    const updateBlog = async (event) => {
        event.preventDefault();
        try {
            await blogService.update( blog.id, { title:title, body:body })
            const temps = await blogService.getAll();
            setBlogs(temps);
            setNotification(`${title} updated!`)
            setTitle('');
            setBody('');
            refService.blogUpdateRef.current.toggleVisibility();
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

    return (
        <form onSubmit={PostNotPut ? handleBlog : updateBlog}>
            <div>
                title
                <input
                    type='text'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    name='title'
                />
            </div>

            <div>
                content
                <input
                    type='text'
                    value={body}
                    onChange={({ target }) => setBody(target.value)}
                    name='body'
                />
            </div>
            <button type='submit'>submit</button>
        </form>
    )
}
export default BlogForm;