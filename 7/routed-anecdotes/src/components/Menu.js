import React from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'

const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link to='/anecdotes' style={padding}>anecdotes</Link>
            <Link to='/new' style={padding}>create new</Link>
            <Link to='/about' style={padding}>about</Link>
          </div>
          <div>
            <Route exact path='/anecdotes' render={() => <AnecdoteList anecdotes={anecdotes} />} />
            <Route exact path='/about' render={() => <About />} />
            <Route exact path='/new' render={() => <CreateNew addNew={addNew} />} />
          </div>
        </div>
      </Router>
    </div>
  )
}

export default Menu