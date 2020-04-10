import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { FIND_BOOK } from '../queries'

const Books = ({ books }) => {
  const [book, setBook] = useState(null)
  const [getBook, result] = useLazyQuery(FIND_BOOK)

  useEffect(() => {
    if (result.data) {
      setBook(result.data.findBook)
    }
  }, [result.data])

  return (
    <div>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th scope='col'>title</th>
            <th scope='col'>published</th>
            <th scope='col'>author</th>
            <th scope='col'>genres</th>
          </tr>
        </thead>
        {books.map(b => {
          return (
            <tbody key={b.name}>
              <tr>
                <td>
                  {b.title}
                </td>
                <td>
                  {b.published}
                </td>
                <td>
                  {b.author.name}
                </td>
                <td>
                  {b.genres}
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

export default Books