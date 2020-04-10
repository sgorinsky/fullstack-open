import React, { useState } from 'react';
import { useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'

import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [view, setView] = useState(true)

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <button onClick={() => setView(true)}>Authors</button>
      <button onClick={() => setView(false)}>Books</button>
      {view ? 
        <Authors authors={authors.data.allAuthors} /> 
      : <Books books={books.data.allBooks} />
      }
    </div>
  )
}

export default App;
