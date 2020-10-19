const messageReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    case 'RESET_MESSAGE':
      return null
    default:
      return state
  }
}

let timeoutID

export const setMessage = (message, timeInSeconds) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_MESSAGE',
      message
    })
    timeoutID = setTimeout(() => dispatch({
      type: 'RESET_MESSAGE'
    }), timeInSeconds * 1000)
  }
}

export default messageReducer
