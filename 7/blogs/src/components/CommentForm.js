import React from 'react'
import { connect } from 'react-redux'

import useField from '../hooks/useField'
import { makeComment } from '../reducers/blogs'
import { clearAllNotifications, setSuccessNotification, setErrorNotification } from '../reducers/notifications'

const CommentForm = ({ blog, makeComment, clearAllNotifications, setSuccessNotification, setErrorNotification }) => {
  const comment = useField('comment')
  const submitComment = async (event) => {
    event.preventDefault()
    try {
      const comments = blog.comments ? blog.comments.concat(comment.input.value) : [comment.input.value]
      await makeComment(blog.id, { comments })
      setSuccessNotification('Comment posted!')
      comment.reset()
    } catch(error) {
      console.error(error)
      setErrorNotification('Error posting comment')
    } finally {
      setTimeout(() => clearAllNotifications(), 1200)
    }
  }

  return (
    <div>
      <form onSubmit={submitComment}>
        <input {...comment.input} />
        <button className='btn btn-success my-2' type='submit'>add comment</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  makeComment,
  clearAllNotifications,
  setSuccessNotification,
  setErrorNotification
}

export default connect(null, mapDispatchToProps)(CommentForm)