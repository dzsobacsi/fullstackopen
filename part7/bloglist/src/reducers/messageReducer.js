const initialState = {
  message: null,
  success: false
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return {
      message: action.message,
      success: action.success
    }
  case 'RESET_MESSAGE':
    return initialState
  default:
    return state
  }
}

let timeoutID

export const setMessage = (message, success, timeInSeconds) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_MESSAGE',
      message,
      success
    })
    timeoutID = setTimeout(() => dispatch({
      type: 'RESET_MESSAGE'
    }), timeInSeconds * 1000)
  }
}

export default messageReducer
