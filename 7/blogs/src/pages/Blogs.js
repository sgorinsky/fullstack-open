import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { getBlogs } from '../reducers/blogs'

import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'

import Table from 'react-bootstrap/Table'

const Blogs = ({
  user,
  blogs,
  getBlogs,
}) => {
  const getBlogByID = (id) => blogs.find(blog => {
    return id === blog.id
  })

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <Router>
      <Route exact path='/blogs/:id' render={({ match }) => <Blog blog={getBlogByID(match.params.id) || blogs[0]} />} />
      <div>
        <h2>Blogs</h2>
        {user &&
          <Togglable buttonLabel="new blog?">
            <BlogForm />
          </Togglable>
        }
        {blogs
          && 
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
          </Table>}
      </div>
    </Router>
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