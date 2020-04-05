import React from 'react'
import { connect } from 'react-redux'

import useField from '../hooks/useField'
import { makeComment } from '../reducers/blogs'

const CommentForm = ({ blog, makeComment }) => {
  const comment = useField('comment')
  const submitComment = async (event) => {
    event.preventDefault()
    try {
      const comments = blog.comments ? blog.comments.concat(comment.input.value) : [comment.input.value]
      await makeComment(blog.id, { comments })
      comment.reset()
    } catch(error) {
      console.error(error)
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
  makeComment
}

export default connect(null, mapDispatchToProps)(CommentForm)