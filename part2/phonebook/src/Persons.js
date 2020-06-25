import React from 'react'
import Person from './Person'

const Persons = ({ persons, searchTerm, handleDelete }) => (
  <>
    <table>{
      persons
        .filter(p => p.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
        .map(p => <Person key={p.id} person={p} handleDelete={handleDelete} />)
    }</table>
  </>
)

export default Persons
