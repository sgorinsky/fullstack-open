import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)