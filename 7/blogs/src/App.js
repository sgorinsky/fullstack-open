import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'

// components
import Notification from './components/Notification'

// pages
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Users from './pages/Users'

const App = () => {
  const padding = { padding: 5 }
  return (
    <Router>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">login</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/blogs">blogs</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Notification />
      <Route exact path='/' render={() => <Login />} />
      <Route exact path='/users' render={() => <Users />} />
      <Route exact path='/blogs' render={() => <Blogs />} />
    </Router>
  )
}

export default App
