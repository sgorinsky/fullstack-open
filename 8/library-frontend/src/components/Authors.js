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

        <thead>
          <tr>
            <th scope='col'></th>
            <th scope='col'>born</th>
            <th scope='col'>books</th>
          </tr>
        </thead>
        {authors.map(a => {
          return (
            <tbody key={a.name}>
              <tr>
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
            </tbody>
          )
        }
      )}
      </table>
    </div>
  )
}

export default Authors