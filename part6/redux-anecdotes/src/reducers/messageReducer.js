const messageReducer = (state = null, action) => {
  // console.log('state now: ', state)
  // console.log('action: ', action)

  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    case 'RESET_MESSAGE':
      return null
    default:
      return state
  }
}

export const setMessage = message => {
  return {
    type: 'SET_MESSAGE',
    message
  }
}

export const resetMessage = () => {
  return {
    type: 'RESET_MESSAGE'
  }
}

export default messageReducer
