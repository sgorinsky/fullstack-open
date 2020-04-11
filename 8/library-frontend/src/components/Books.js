import React from 'react'

const Books = ({ books }) => {
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
            <tbody key={b.title}>
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
                  {b.genres.join(', ')}
                </td>
              </tr>
            </tbody>
          )}
        )}
      </table>
    </div>
  )
}

export default Books