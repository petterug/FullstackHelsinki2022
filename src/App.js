import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('enter name..')
  const [newNumber, setNewNumber] = useState('enter number..')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    if(newName === '') {
      return alert('Please enter a name')
    }

    if( persons.findIndex((element) => element.name == newName) !== -1) {
      return alert(`${newName} is already added to the phonebook`)
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {    
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <div>
      <h3>Phonebook</h3>
      <Filter searchFilter={searchFilter} searchChange={handleSearchChange} />
      <h3>Add new person</h3>
      <PersonForm name={newName} number={newNumber} addName={addName} nameChange={handleNameChange} numberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons names={persons} searchFilter={searchFilter} />
    </div>
  )
}

export default App