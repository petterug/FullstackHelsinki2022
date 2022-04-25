import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('enter name..')
  const [newNumber, setNewNumber] = useState('enter number..')
  const [searchFilter, setSearchFilter] = useState('')
  const [message, setMessage] = useState(null)

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

    const personIndex = persons.findIndex((element) => element.name == newName)

    if( personIndex !== -1) {
      const updatePerson = {...persons[personIndex], number: newNumber}
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
       personService
        .update(updatePerson.id, updatePerson)
        .then(response => {
          setPersons(persons.map(person => person.id != persons[personIndex].id ? person : response.data))
        })
        console.log('updated');
      } else {console.log('cancelled')}
    } else {

      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
    setMessage(`success, ${newName}`)
    setTimeout(() => {
      setMessage(null)
    }, 2000)
}

  const deletePerson = (prop) => {
    if(window.confirm(`Delete ${prop.name}?`)) {
      personService
        .deletePerson(prop.id)
        .then(() => {
          const people = persons.filter((person) => person.id !== prop.id)
          setPersons(people)
        })
        .catch(
          setMessage(`error, ${prop.name}`),
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        )
    }
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
      <Notification message={message}/> 
      <Filter searchFilter={searchFilter} searchChange={handleSearchChange} />
      <h3>Add new person</h3>
      <PersonForm name={newName} number={newNumber} addName={addName} nameChange={handleNameChange} numberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons names={persons} searchFilter={searchFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App