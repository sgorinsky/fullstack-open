import React, { useState } from 'react';
import { useQuery } from '@apollo/client'

import Authors from './components/Authors'
import AuthorForm from './components/AuthorForm'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'

import { ALL_AUTHORS, ALL_BOOKS } from './queries';

const App = () => {
  const [view, setView] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  })

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <LoginForm setToken={setToken} setError={setErrorMessage} />
    )
  }
  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <button onClick={() => setView(true)}>Authors</button>
      <button onClick={() => setView(false)}>Books</button>
      {view ? 
        <div>
          <Authors authors={authors.data.allAuthors} />
          <AuthorForm isAddAuthor={false} setError={setErrorMessage} />
          <AuthorForm setError={setErrorMessage} />
        </div>
      : <div>
          <Books books={books.data.allBooks} />
          <BookForm isAddBook={false} setError={setErrorMessage} />
          <BookForm setError={setErrorMessage} />
        </div>
      }
    </div>
  )
}

export default App;
