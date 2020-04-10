import React from 'react';
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import { ALL_AUTHORS } from './queries';

const App = () => {
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Authors authors={result.data.allAuthors} />
    </div>
  )
}

export default App;
