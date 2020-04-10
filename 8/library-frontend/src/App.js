import React, { useState } from 'react';
import { useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'

import { ALL_AUTHORS } from './queries';

const App = () => {
  const result = useQuery(ALL_AUTHORS)
  const [view, setView] = useState(false)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <button onClick={() => setView(false)}>Authors</button>
      <button onClick={() => setView(true)}>Books</button>
      {!view ? <Authors authors={result.data.allAuthors} /> : null}
    </div>
  )
}

export default App;
