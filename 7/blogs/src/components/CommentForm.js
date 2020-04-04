import React from 'react'

import useField from '../hooks/useField'

const CommentForm = (props) => {
  const comment = useField('comment')
  const submitComment = () => {

  }
  
  return (
    <div>
      <form onSubmit={submitComment}>
        <input {...comment.input} />
        <button className='btn btn-success' type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default CommentForm