import React from 'react'

const Notification = ({ message, success }) => {
  const style = {
    background: 'lightgray',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    margin: 15,
    fontSize: 20,
    fontStyle: 'italic',
  }
  style.color = success ? 'green' : 'red'

  if (message === null) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
