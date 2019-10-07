import React, { useState } from 'react';

const BlogForm = ({ title, setTitle, body, setBody, handleBlog }) => {

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