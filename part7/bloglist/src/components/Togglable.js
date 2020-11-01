import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  Togglable.displayName = 'Togglable'

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
        <br/>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="secondary" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

export default Togglable
