import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getBlogs } from '../reducers/blogs'

import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'

const Blogs = ({
  blogs,
  getBlogs,
}) => {
  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <div>
      <Togglable buttonLabel="new blog?">
        <BlogForm />
      </Togglable>
      {blogs && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  getBlogs,
}
export default connect(mapStateToProps, mapDispatchToProps)(Blogs)