import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'

import Table from 'react-bootstrap/Table'

const Blogs = ({
  user,
  blogs,
}) => {
  return (
      <div className='container'>
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

export default connect(mapStateToProps)(Blogs)