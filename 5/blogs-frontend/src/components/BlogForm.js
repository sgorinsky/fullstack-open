import React, { useState } from 'react';
import blogService from '../services/blogs'
import refService from '../services/refs'

const BlogForm = ({ user, blogs, setBlogs, setNotification, setError, blog='', PostNotPut=true }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleBlog = async (event) => {
        event.preventDefault();
        try {
            console.log(1)
            console.log(user)
            console.log(body)
            console.log(title)
            
            const newBlog = {
                title: title,
                body: body,
                author:  user.username,
                likes: 0,
                user:  user.id
            }
            console.log(2)
            const response = await blogService.create(newBlog,  user.token);
            console.log(3)
            setBlogs(blogs.concat(response));
            console.log(4)
            setNotification(`${title} created by ${ user.username}!`);
            console.log(5)
            setTitle('');
            setBody('');
            setTimeout(() => {
                setNotification(null);
            }, 1500)
        } catch {
            console.log('howd we get here?')
            setError(true);
            setNotification(`error posting ${title}`)

            setTimeout(() => {
                setError(false);
                setNotification(null)
            }, 2500)
        }
        console.log('where are we')
    }

    const updateBlog = async (event) => {
        event.preventDefault();
        try {
            console.log(1)
            await blogService.update( blog.id, { title:title, body:body })
            console.log(2)
            const temps = await blogService.getAll();
            console.log(3)
            setBlogs(temps);
            setNotification(`${title} updated!`)
            setTitle('');
            setBody('');
            refService.blogUpdateRef.current.toggleVisibility();
            setTimeout(() => {
                setNotification(null)
            }, 2500)
        } catch {
            console.log('In the error')
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