import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { initializeBlogs } from './reducers/blogs'

// components
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = (props) => {
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    props.initializeBlogs()
    setBlogs(props.blogs)
  }, [props.blogs]);
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)      
      setUser(user);
    }
  }, [])

  return (
    <>
      <Notification message={notification} error={error} />
      {
        user === null ?
        <Togglable buttonLabel="login?" start={true}>
            <LoginForm
              setUser={setUser}
              setNotification={setNotification}
              setBlogs={setBlogs}
              setError={setError}
            />
        </Togglable>
          :
          <div className='logout'>
            <li>
              {user.username} logged in
              <Togglable buttonLabel="logout?">
                <Logout
                  user={user}
                  setUser={setUser}
                  setNotification={setNotification}
                  setError={setError}
                  setBlogs={setBlogs}
                />
              </Togglable>              
              <Togglable buttonLabel="new blog?">
                <BlogForm
                  user={user}
                  blogs={blogs} 
                  setBlogs={setBlogs} 
                  setNotification={setNotification} 
                  setError={setError}
                />
              </Togglable>
            </li>
          </div>
      }
      { props.blogs && 
        props.blogs
          .map(blog => 
            <Blog 
              key={blog.id} 
              blog={blog} 
              blogs={blogs}
              user={user} 
              setUser={setUser}
              setNotification={setNotification}
              setBlogs={setBlogs}
              setError={setError}
            />
          )
      }
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  initializeBlogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
