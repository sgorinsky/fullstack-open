import React from 'react'

// components
import Notification from './components/Notification'

// pages
import Blogs from './pages/Blogs'
import Users from './pages/Users'

const App = () => {

  return (
    <>
      <Notification />
      <Users />
      <Blogs />
    </>
  )
}

export default App
