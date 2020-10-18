import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/messageReducer'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const search = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(setMessage(`You voted "${anecdote.content}"`, 4))
  }

  return (
    <div>
      <div style={{height: 25}}></div>
      {anecdotes
        .filter(a => a.content.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
