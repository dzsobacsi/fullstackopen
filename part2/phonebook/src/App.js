import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Notification from './Notification'
import pbService from './services/phonebook'

const App = () => {
  const [ persons,    setPersons ]   = useState([])
  const [ newName,    setNewName ]   = useState('add a new name...')
  const [ newNumber,  setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm] = useState('')
  const [ message,    setMessage ]   = useState(null)
  const [ success,    setSuccess ]   = useState(false)

  const alphabeticSortOfNames = (a, b) => a.name < b.name ? -1 : 1

  useEffect(() => {
    //console.log('effect')
    pbService.getAll().then(response => {
      console.log('getAll fulfilled', response)
      setPersons(response.sort(alphabeticSortOfNames))
    })
  }, [])
  //console.log(`render ${persons.length} notes`)

  const addPerson = (event) => {
    // I do nothing with that event, I use the app state to add or modify the
    // phonebook items
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    const isNew = persons.find(p => p.name === newName) === undefined

    if (newName === '') {
      alert('Please enter a name')

    // ===================== A new item to add ==========================
    } else if(isNew) {
        pbService.add(person)
          .then(response => {
            console.log('new item added ', response)
            setPersons(persons.concat(response).sort(alphabeticSortOfNames))
            setNewName('')
            setNewNumber('')
            setSuccess(true)
            setMessage(`Added ${response.name} `)
            setTimeout(() => {
              setMessage(null)
            }, 2500)
          })
          .catch((error) => {
            console.log(error.response.data)
            setSuccess(false)
            setMessage(error.response.data.error)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })

    // ================== An existing item to update =====================
    } else {
      const confirmed = window.confirm(`${person.name} is already in the phonebook. Replace the old number with a new one?`)
      if (confirmed) {
        console.log(`${person.name} will be updated...`)
        person.id = persons.find(p => p.name === person.name).id
        pbService.update(person)
          .then((response) => {
            console.log('... to:', response)
            setPersons(persons.map(p => p.id !== person.id ? p : response))
            setNewName('')
            setNewNumber('')
            setSuccess(true)
            setMessage(`Updated ${response.name} `)
            setTimeout(() => {
              setMessage(null)
            }, 2500)
          })
          .catch(error => {
            console.log(error.response.data)
            setSuccess(false)
            setMessage(error.response.data.error)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleDelete = (personToDelete) => {
    const confirmed = window.confirm(`Are you sure to delete ${personToDelete.name} from the phonebook?`)
    if (confirmed) {
      console.log(`${personToDelete.name} will be deleted now!!!`)
      pbService.remove(personToDelete)
        .then(() => {
          setPersons(persons.filter(p => p !== personToDelete))
          setNewName('')
          setNewNumber('')
          setSuccess(true)
          setMessage(`Deleted ${personToDelete.name} `)
          setTimeout(() => {
            setMessage(null)
          }, 2500)
        })
        .catch(() => {
          setSuccess(false)
          setMessage(`${personToDelete.name} is alredy deleted from the server`)
          setTimeout(() => {
            setMessage(null)
          }, 3500)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={success}/>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h2>Add a new person</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        handleDelete={handleDelete}/>
    </div>
  )
}

export default App
