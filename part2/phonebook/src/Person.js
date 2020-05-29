import React from 'react'

const Person = ({ person, handleDelete }) => (
  <>{person.name} &emsp; {person.number} &emsp;
    <button onClick={() => handleDelete(person)}>delete</button><br/>
  </>
)

export default Person
