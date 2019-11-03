const notificationReducer = (state=[], action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const notificationChange = (notification) => {
  console.log(`NOTIFICATION: ${notification}`)
  return {
    type: 'NOTIFICATION',
    notification
  }
}

export default notificationReducer

