import React, { useState, useEffect } from 'react';
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import blogService from './services/blogs'

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadIn = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs);
    }
    loadIn()
  }, []);
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)      
      setUser(user);
    }
  }, [])


  const rows = () => blogs.map(blog => <Blog key={blog.id} blog={blog} />)

  return (
    <>
      <Notification message={notification} error={error} />
      {
        user === null ?
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            setUser={setUser}
            setNotification={setNotification}
            error={error}
            setError={setError}
          /> :
          <div>
            <li>
              {user.username} logged in
              <Logout 
                user={user}
                setUser={setUser}
                setNotification={setNotification}
                setError={setError}
              />
              <BlogForm
                user={user}
                blogs={blogs}
                setBlogs={setBlogs}
                setNotification={setNotification}
                setError={setError}
              />
            </li>
          </div>
      }
      {rows()}
    </>
  );
}

export default App;
