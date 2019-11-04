import React from 'react'

const Notification = (props) => {
  const { notification } = props.store.getState()
  console.log('GETTING STATE')
  console.log(props.store.getState())
  console.log(notification)
  const display = notification.content ? notification.display : 'none'
  const style = {
    display,
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return (
    <>
      <div style={style}>
        {`you upvoted ${notification.content}`}
      </div>
      <br></br>
    </>
  )
}

export default Notification