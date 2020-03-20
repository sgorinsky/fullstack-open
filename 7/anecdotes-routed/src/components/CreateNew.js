import React from 'react'
import Notification from './Notification'
import useNotification from './hooks/useNotification'
import useField from './hooks/useField'

const CreateNew = ({ addNew }) => {
  
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const notification = useNotification()

  const clear = (event) => {
    event.preventDefault()
    content.onChange('')
    author.onChange('')
    info.onChange('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    notification.show()
    notification.setDisplay(`Anecdote ${content.value} has been created!`)

    setTimeout(() => {
      clear(event)
      notification.hide()
    }, 1500)

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      {notification.appear && <Notification content={notification.display} />}
      <form>
        <div>
          content{' '}
          <input {...content} />
        </div>
        <div>
          author{' '}
          <input {...author} />
        </div>
        <div>
          url for more info{' '}
          <input {...info} />
        </div>
        <button name='submit' onClick={handleSubmit}>create</button>
        <button onClick={(e) => clear(e)}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew