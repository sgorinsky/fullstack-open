import React from 'react'
import { connect } from 'react-redux'

import LoginForm from '../components/LoginForm'
import Logout from '../components/Logout'
import Togglable from '../components/Togglable'

const Login = ({ user }) => {
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
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user
  }
}

export default connect(mapStateToProps)(Login)