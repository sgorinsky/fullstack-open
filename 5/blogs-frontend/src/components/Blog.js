import React from 'react' 

const Blog = ({blog}) => {
    return (
        <div className='blog'>
            <li className='title'> <h3>title: {blog.title}</h3></li>
            <li className='author'> <h5>author: {blog.author}</h5></li>
            <li className='body'>{blog.body}</li>
        </div>
    )
}

export default Blog;