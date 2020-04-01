// Action handler
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.message,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.message,
      }
    case 'CLEAR_SUCCESS':
      return {
        ...state,
        success: null,
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    case 'CLEAR_ALL':
      return {
        error: null,
        success: null
      }
    default:
      return {
        error: null,
        success: null
      }
  }
}

// Dispatchers
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

export const clearSuccessNotification = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_SUCCESS'
    })
  }
}

export const clearErrorNotification = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_ERROR'
    })
  }
}

export const clearAllNotifications = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR_ALL'
    })
  }
}


export default notificationReducer