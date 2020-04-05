import React from 'react'
import { connect } from 'react-redux'

import LoginForm from '../components/LoginForm'
import Logout from '../components/Logout'
import Togglable from '../components/Togglable'

const Login = ({ user }) => {
  console.log(user)
  return (
    <div className='container'>
      {!user && <LoginForm />}
      {user && 
        <div className='logout'>
          <li>
            {user.username} logged in
            <Togglable buttonLabel="logout?">
              <Logout />
            </Togglable>
          </li>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  }
}

export default connect(mapStateToProps)(Login)