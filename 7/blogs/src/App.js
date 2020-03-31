import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { getBlogs } from './reducers/blogs'
import { login } from './reducers/user'

// components
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = ({ user, login, blogs, getBlogs }) => {
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getBlogs()
  }, [user]);
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      login(user);
    }
  }, [])

  return (
    <>
      <Notification />
      {
        !user ?
        <Togglable buttonLabel="login?" start={true}>
            <LoginForm
              setNotification={setNotification}
              setError={setError}
            />
        </Togglable>
          :
          <div className='logout'>
            <li>
              {user.username} logged in
              <Togglable buttonLabel="logout?">
                <Logout
                  setNotification={setNotification}
                  setError={setError}
                />
              </Togglable>              
              <Togglable buttonLabel="new blog?">
                <BlogForm
                  setNotification={setNotification} 
                  setError={setError}
                />
              </Togglable>
            </li>
          </div>
      }
      {blogs
      && blogs
          .map(blog => 
            <Blog 
              key={blog.id} 
              blog={blog}
              setNotification={setNotification}
              setError={setError}
            />
          )
      }
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
  }
}

const mapDispatchToProps = {
  getBlogs,
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
