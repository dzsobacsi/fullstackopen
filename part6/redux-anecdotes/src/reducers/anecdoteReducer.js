import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(a => a.id !== id ? a : action.data)
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
  return async (dispatch, getState) => {
    const votedAnecdote = getState().anecdotes.find(a => a.id === id)
    const changedAnecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const addNew = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const initialzeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
