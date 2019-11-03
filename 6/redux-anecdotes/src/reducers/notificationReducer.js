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

export const notificationSet = (content) => {
  console.log(`NOTIFICATION: ${content}`)
  return {
    type: 'NOTIFICATION_SET',
    notification: {
      content,
      display: ''
    }
  }
}

export const notificationRemove = () => {
  return {
    type: 'NOTIFICATION_REMOVE',
    notification: {
      content: '',
      display: 'none'
    }
  }
}

export default notificationReducer

