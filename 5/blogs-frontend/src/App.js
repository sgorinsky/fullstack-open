import React, { useState, useEffect } from 'react';
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loginVisible, setLoginVisible] = useState(true);
  
  const blogFormRef = React.createRef();

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

  

  const handleBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: title,
        body: body,
        author: user.username,
        likes: 0,
        user: user.id
      }
      const response = await blogService.create(newBlog, user.token);
      setBlogs(blogs.concat(response));
      blogFormRef.current.toggleVisibility();
      setNotification(`${title} created by ${user.username}!`);
      setTitle('');
      setBody('');
      setTimeout(() => {
        setNotification(null);
      }, 1500)
    } catch (error) {
      setError(true);
      setNotification('Include all fields when creating new blog');
      setTimeout(() => {
        setError(false);
        setNotification(null);
      }, 3000)
    }
  }

  return (
    <>
      <Notification message={notification} error={error} />
      {
        user === null ?
        <Togglable buttonLabel="login?">
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              setUser={setUser}
              setNotification={setNotification}
              error={error}
              setError={setError}
            />
        </Togglable>
           :
          <div>
            <li>
              {user.username} logged in
              <Togglable buttonLabel="logout?">
                <Logout
                  user={user}
                  setUser={setUser}
                  setNotification={setNotification}
                  setError={setError}
                />
              </Togglable>              
              <Togglable buttonLabel="new blog?" ref={blogFormRef}>
                <BlogForm
                  handleBlog={handleBlog}
                  title={title}
                  setTitle={setTitle}
                  body={body}
                  setBody={setBody}
                />
              </Togglable>
            </li>
          </div>
      }
      {
        blogs.map(blog => 
          <Blog 
            key={blog.id} 
            blog={blog} 
            user={user} 
            setNotification={setNotification}
            setBlogs={setBlogs}
            setError={setError}
          />
        )
      }
    </>
  );
}

export default App;
