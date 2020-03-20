import React, { useState } from 'react'
import Notification from './Notification'

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const NotificationHook = () => {
    const [notification, setNotification] = useState('')
    const [shouldAppear, setShouldAppear] = useState(false)

    const show = () => {
      setShouldAppear(true)
    }
    
    const hide = () => {
      setShouldAppear(false)
    }

    return {
      display: notification,
      setDisplay: (display) => setNotification(display),
      appear: shouldAppear,
      show,
      hide,
    }
  }

  const notification = NotificationHook()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    notification.show()
    notification.setDisplay(`Anecdote ${content} has been created!`)
    setTimeout(() => notification.hide(), 1000)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      {notification.appear && <Notification content={notification.display} />}
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

export default CreateNew