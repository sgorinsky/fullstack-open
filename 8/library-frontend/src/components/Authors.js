import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_AUTHOR } from '../queries'

const Authors = ({ authors }) => {
  const [author, setAuthor] = useState(null)
  const [getAuthor, result] = useLazyQuery(FIND_AUTHOR)

  useEffect(() => {
    if (result.data) {
      setAuthor(result.data.findAuthor)
    }
  }, [result.data])

  return (
    <div>
      <h2>Authors</h2>
      <table>

        <tr>
          <th scope='col'></th>
          <th scope='col'>born</th>
          <th scope='col'>books</th>
        </tr>
        {authors.map(a => {
          console.log(a)
          return (
            <tr key={a.name}>
              <td>
                {a.name}
              </td>
              <td>
                {a.born}
              </td>
              <td>
                {a.bookCount}
              </td>
            </tr>
          )
        }
      )}
      </table>
    </div>
  )
}

export default Authors