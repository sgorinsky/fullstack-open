import React from 'react'
import Notification from './Notification'
import useNotification from './hooks/useNotification'
import useField from './hooks/useField'

const CreateNew = ({ addNew }) => {

  const notification = useNotification()
  const fields = useField()

  const clear = (event) => {
    event.preventDefault()
    fields.clear()
    notification.show()
    notification.setDisplay('Cleared fields')
    setTimeout(() => notification.hide(), 1000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    addNew({
      content: fields.content,
      author: fields.author,
      info: fields.info,
      votes: 0
    })

    notification.show()
    notification.setDisplay(`Anecdote ${fields.content} has been created!`)
    setTimeout(() => {
      fields.clear()
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
          <input name='content' value={fields.content} onChange={(e) => fields.setContent(e.target.value)} />
        </div>
        <div>
          author{' '}
          <input name='author' value={fields.author} onChange={(e) => fields.setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info{' '}
          <input name='info' value={fields.info} onChange={(e) => fields.setInfo(e.target.value)} />
        </div>
        <button name='submit' onClick={handleSubmit}>create</button>
        <button onClick={(e) => clear(e)}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew