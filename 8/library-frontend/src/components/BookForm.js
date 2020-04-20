import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, EDIT_BOOK, ALL_BOOKS } from '../queries'

const BookForm = ({ isAddBook = true, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  
  const [genres, setGenres] = useState([])
  const [tempGenre, setTempGenre] = useState('')

  const [editBook] = useMutation(EDIT_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      console.log(error)
      setError(error.graphQLErrors[0].message)
    }
  })
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      console.log(error)
      setError(error.graphQLErrors[0].message)
    }
  })


  const addGenre = () => {
    if (tempGenre.length > 0) {
      setGenres(genres.concat(tempGenre))
      setTempGenre('')
    }
  }
  const removeGenre = () => {
    setGenres(genres.slice(0, genres.length-1))
  }

  const submit = async (event) => {
    event.preventDefault()
    const publishedInt = Number(published)

    if (isAddBook) {
      addBook({
        variables: {
          title,
          published: publishedInt,
          genres,
          author,
        }
      })
    } else {
      editBook({ variables: { 
        title, 
        published: publishedInt,
        genres,
        author,
      } })
    }

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
  }

  return (
    <div>
      <h2>{isAddBook ? 'create new book' : 'edit book by title'}</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          genre
          <input value={tempGenre}
            onChange={({ target }) => setTempGenre(target.value)}
          />
          <button type='button' onClick={addGenre}>add genre</button>
          <button type='button' onClick={removeGenre}>remove genre</button>
        </div>
        <div>
          current genres: {genres.length ? genres.join(', ') : 'none'}
        </div>
        <button type='submit'>{isAddBook ? 'add' : 'edit'}</button>
      </form>
    </div>
  )
}

export default BookForm