import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getAllUsers } from '../reducers/users'

const Users = ({
  allUsers,
  getAllUsers,
}) => {
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return (
    <div className='container'>
      <h2>Users</h2>
      {allUsers && allUsers.map((u, idx) => 
        <div key={`${u.name} ${idx}`}> 
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
    allUsers: state.users.all
  }
}

const mapDispatchToProps = {
  getAllUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)