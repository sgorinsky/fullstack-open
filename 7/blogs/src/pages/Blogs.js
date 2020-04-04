import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { getBlogs } from '../reducers/blogs'

import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'

import Table from 'react-bootstrap/Table'

const Blogs = ({
  user,
  blogs,
  getBlogs,
}) => {
  

  useEffect(() => {
    getBlogs()
  }, [])

  return (
      <div>
        <h2>Blogs</h2>
        {user &&
          <Togglable buttonLabel="new blog?">
            <BlogForm />
          </Togglable>
        }
        <Table striped hover>
          <tbody>
            {blogs.map(blog =>
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                      {blog.title}
                  </Link>
                </td>
                <td>
                  {`${blog.likes} likes`}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.users.user,
  }
}

const mapDispatchToProps = {
  getBlogs,
}
export default connect(mapStateToProps, mapDispatchToProps)(Blogs)