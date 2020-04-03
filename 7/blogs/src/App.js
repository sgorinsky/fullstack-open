import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import { login } from './reducers/user'

// components
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

// pages
import Blogs from './pages/Blogs'

const App = ({ user, login }) => {

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
        <LoginForm />
          :
          <div className='logout'>
            <li>
              {user.username} logged in
              <Togglable buttonLabel="logout?">
                <Logout />
              </Togglable>              
            </li>
          </div>
      }
      <Blogs />
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
