import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, EDIT_BOOK, ALL_BOOKS } from '../queries'

const BookForm = ({ isAddBook = true, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState([])

  const [editBook] = useMutation(EDIT_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

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
      <h2>{isAddBook ? 'create new' : 'change author published'}</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input value={published}
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
          genres
          <input value={published}
            onChange={({ target }) => setGenres(target.value)}
          />
        </div>
        <button type='submit'>{isAddBook ? 'add!' : 'edit!'}</button>
      </form>
    </div>
  )
}

export default BookForm