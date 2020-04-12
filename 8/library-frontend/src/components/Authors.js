import React from 'react'

const Authors = ({ authors }) => {

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
                <td className='author-name'>
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