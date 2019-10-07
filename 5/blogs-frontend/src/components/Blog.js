import React, { useState } from 'react' 

const Blog = ({blog}) => {
    const [visible, setVisible] = useState(false);
    const showWhenVisible = { display: visible ? '' : 'none' }
    return (
        <div className='blog'>
            <li className='title' onClick={() => setVisible(!visible)}> <h5>title: {blog.title}</h5></li>
            <div style={showWhenVisible}>
                <li className='author'> <h6>author: {blog.author}</h6></li>
                <li className='body'>{blog.body}</li>
            </div>
        </div>
    )
}

export default Blog;