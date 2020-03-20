import React from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Anecdote from './Anecdote'
import AnecdoteList from './AnecdoteList'
import About from './About'
import CreateNew from './CreateNew'

const Menu = ({ anecdotes, setAnecdotes, addNew }) => {
  const padding = {
    paddingRight: 5
  }

  // Menu is never rerendered after new anecdotes are added so it can only find the id of the initialized anecdotes
  const findAnecdote = (id) => anecdotes.find(anecdote => anecdote.id === Number(id))

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
            <Route exact path='/anecdotes' render={() => <AnecdoteList anecdotes={anecdotes} setAnecdotes={setAnecdotes} />} />
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