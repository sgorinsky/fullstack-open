import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getAllUsers, login } from '../reducers/users'

import LoginForm from '../components/LoginForm'
import Logout from '../components/Logout'
import Togglable from '../components/Togglable'

const Users = ({
  user,
  allUsers,
  getAllUsers,
  login
}) => {

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogsUser')
    getAllUsers()
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
      {allUsers && allUsers.map(u => 
        <div> 
          <strong>{u.username + ' '}</strong>
          created 
          <strong>{' ' + u.blogs.length + ' '} </strong>
          {u.blogs.length === 1 ? 'blog' : 'blogs'}
        </div>
      )}
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
  getAllUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)