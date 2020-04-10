import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_AUTHORS, FIND_AUTHOR } from '../queries'

const Authors = ({ authors }) => {
  const [author, setAuthor] = useState(null)
  const [getAuthor, result] = useLazyQuery(FIND_AUTHOR)

  const showAuthor = (name) => {
    getAuthor({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    if (result.data) {
      setAuthor(result.data.findAuthor)
    }
  }, [result.data])

  if (author) {
    return (
      <div>
        <h2>{author.name}</h2>
        <div>{author.address.street} {author.address.city}</div>
        <div>{author.phone}</div>
        <button onClick={() => setAuthor(null)}>close</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Authors</h2>
      {authors.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showAuthor(p.name)} >
            show address
          </button>
        </div>
      )}
    </div>
  )
}

export default Authors