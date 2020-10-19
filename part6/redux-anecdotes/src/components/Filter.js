import React from 'react'
import { connect } from 'react-redux'
import { setFilter, resetFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const filterChange = (event) => {
    props.setFilter(event.target.value)
  }

  return (
    <>
      <br/>
      filter: <input
        value={props.filter}
        onChange={filterChange}
      />
      <br/>
      <button onClick={() => props.resetFilter()}>clear</button>
    </>
  )
}

const mapStateToProps = state => ({
  filter: state.filter
})

const mapDispatchToProps = {
  setFilter, resetFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
