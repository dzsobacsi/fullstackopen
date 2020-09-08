const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      console.log('vote: ', id)
      const votedAnecdote = state.find(a => a.id === id)
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return state.map(a => a.id !== id ? a : changedAnecdote)
    case 'NEW':
      console.log('new: ', action.data)
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const vote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addNew = content => {
  return {
    type: 'NEW',
    data: content
  }
}

export const initialzeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes,
  }
}

export default anecdoteReducer
