// Modules
import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
// components
import Notification from './components/Notification'
import Blog from './components/Blog'
// dispatchers
import { getBlogs } from './reducers/blogs'
import { loginFromLocalStorage } from './reducers/users'
// pages
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Users from './pages/Users'

const App = ({ user, loginFromLocalStorage, blogs, getBlogs }) => {

  // On App mount, initializes necessities for whole app (since App is root node)
  //    For instance, we wouldn't want to go to another page just to login user 
  //    And we need to grab blogs in order to render /blog/:id routes
  useEffect(() => {
    // Initializes blogs from backend and saves their state
    getBlogs()
    // Client-side, window.localStorage stores null values as string 'undefined'
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsUser')
    if (loggedUserJSON !== 'undefined') {
      const u = JSON.parse(loggedUserJSON)
      loginFromLocalStorage(u);
    }
  }, [getBlogs, loginFromLocalStorage])

  const getBlogByID = (id) => blogs.find(blog => id === blog.id)
  const padding = { padding: 5 }

  return (
    <Router>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">{user ? `${user.username} logged in` : 'login'}</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/blogs">blogs</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Notification />
      <Route exact path='/' render={() => <Login />} />
      <Route exact path='/users' render={() => <Users />} />
      <Route exact path='/blogs' render={() => <Blogs />} />
      <Route exact path='/blogs/:id' render={({ match }) => <Blog blog={getBlogByID(match.params.id)} />} />
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.users.user
  }
}

const mapDispatchToProps = {
  getBlogs,
  loginFromLocalStorage
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
