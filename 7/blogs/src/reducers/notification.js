const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.message,
        error: null
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.message,
        success: null
      }
    case 'CLEAR_ALL':
      return {
        ...state,
        error: null,
        success: null
      }
    default:
      return {
        ...state,
        error: null,
        success: null
      }
  }
}

export const setSuccessNotification = (message) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_SUCCESS',
      message
    })
  }
}

export const setErrorNotification = (message) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ERROR',
      message
    })
  }
}

export const clearAllNotifications = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_ALL_NOTIFICATIONS'
    })
  }
}


export default notificationReducer