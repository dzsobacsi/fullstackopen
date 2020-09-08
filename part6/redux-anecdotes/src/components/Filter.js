import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter, resetFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const filterChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <>
      <br/>
      filter: <input
        value={filter}
        onChange={filterChange}
      />
      <br/>
      <button onClick={() => dispatch(resetFilter())}>clear</button>
    </>
  )
}

export default Filter
