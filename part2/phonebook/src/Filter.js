import React from 'react'

const Filter = ({ searchTerm, handleSearchChange }) => (
  <>
    search: <input
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </>
)

export default Filter
