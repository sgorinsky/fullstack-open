const notificationReducer = (state=[], action) => {
  switch (action.type) {
    case 'NOTIFICATION_SET':
      return action.notification
    case 'NOTIFICATION_REMOVE':
      return action.notification
    default:
      return 'none'
  }
}

export const setNotification = (content, timeOut) => {
  return async (dispatch) => {
    dispatch({
      type:'NOTIFICATION_SET',
      notification: {
        content,
        display: ''
      }
    })
    setTimeout(() => dispatch({
      type: 'NOTIFICATION_REMOVE',
      notification: {
        content: '',
        display: 'none'
      }
    }), timeOut*1000)
  }
}

export default notificationReducer

