import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/messageReducer'

const AnecdoteList = (props) => {
  const handleVote = (anecdote) => {
    props.vote(anecdote.id)
    props.setMessage(`You voted "${anecdote.content}"`, 4)
  }

  return (
    <div>
      <div style={{height: 25}}></div>
      {props.anecdotes
        .filter(a => a.content
          .toLowerCase()
          .includes(props.filter.toLowerCase())
        )
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

const mapStateToProps = state => ({
  anecdotes: state.anecdotes,
  filter: state.filter
})

const mapDispatchToProps = {
  vote, setMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
