import React from 'react'

const Filter = ({ searchTerm, handleSearchChange }) => (
  <>
    Find countries: <input
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </>
)

export default Filter
