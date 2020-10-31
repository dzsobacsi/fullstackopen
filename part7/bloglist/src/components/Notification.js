import React from 'react'
import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Notification = ({ message, success }) => {
  Notification.propTypes = {
    message: PropTypes.string,
    success: PropTypes.bool.isRequired
  }

  if (message === null) return null

  return (
    <Alert variant={success ? 'success' : 'danger'}>
      {message}
    </Alert>
  )
}

export default Notification
