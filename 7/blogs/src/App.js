import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { getBlogs } from './reducers/blogs'
import { login } from './reducers/users'

// components
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = (props) => {
  // const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    props.getBlogs()
  }, []);
  
  /*
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)      
      setUser(user);
    }
  }, [])
  */

  return (
    <>
      <Notification message={notification} error={error} />
      {
        !props.user ?
        <Togglable buttonLabel="login?" start={true}>
            <LoginForm
              setNotification={setNotification}
              setError={setError}
            />
        </Togglable>
          :
          <div className='logout'>
            <li>
              {props.user.username} logged in
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
      {/*
      && props.blogs
          .map(blog => 
            <Blog 
              key={blog.id} 
              blog={blog} 
              blogs={blogs}
              user={props.user} 
              setUser={setUser}
              setNotification={setNotification}
              setBlogs={setBlogs}
              setError={setError}
            />
          )
          */}
    </>
  )
}
const mapStateToProps = (state) => {
  console.log(state)
  return {
    blogs: state.blogs,
    user: state.users,
  }
}

const mapDispatchToProps = {
  getBlogs,
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
