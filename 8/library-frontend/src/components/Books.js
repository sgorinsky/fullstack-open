import React, { useState, useEffect } from 'react'

const Books = ({ books }) => {
  const [genre, setGenre] = useState(true)
  const [allGenres, setAllGenres] = useState([])
  useEffect(() => {

    let currentGenres = new Set();
    books.forEach(b => {
      b.genres.forEach(genre => {
        currentGenres.add(genre.toLowerCase())
      })
    })
    setAllGenres([...currentGenres])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(allGenres)
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
        {books.filter(b => genre || b.genres.includes(genre)).map(b => {
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
      <div>
        {
          allGenres.length > 0 && allGenres.map(genre => <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>)
        }
        <button onClick={() => setGenre(true)}>all genres</button>
      </div>
    </div>
  )
}

export default Books