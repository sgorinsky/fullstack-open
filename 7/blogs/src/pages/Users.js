import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { login } from '../reducers/users'

import LoginForm from '../components/LoginForm'
import Logout from '../components/Logout'
import Togglable from '../components/Togglable'

const Users = ({
  user,
  allUsers,
  login
}) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      login(user);
    }
  }, [])

  return (
    <div>
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
      <h2>Users</h2>
      {allUsers && allUsers.map(u => <div> <h3>{u.username + ' ' + u.blogs.length}</h3> </div>)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    allUsers: state.users.all
  }
}

const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)