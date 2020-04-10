import React, { useState } from 'react';
import { useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import Notify from './components/Notify'

import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
  const [view, setView] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 3000
  })
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 3000,
  })

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notify errorMessage={errorMessage}/>
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
