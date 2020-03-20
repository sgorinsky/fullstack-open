import React from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Anecdote from './Anecdote'
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'

const Menu = ({ anecdotes, addNew }) => {
  const padding = {
    paddingRight: 5
  }
  const findAnecdote = (id) => anecdotes.find(anecdote => anecdote.id === Number.id)

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
            <Route path='/anecdotes/:id' render={({ match }) => <Anecdote anecdote={findAnecdote(match.params.id)} />} />
            <Route path='/about' render={() => <About />} />
            <Route path='/new' render={() => <CreateNew addNew={addNew} />} />
          </div>
        </div>
      </Router>
    </div>
  )
}

export default Menu