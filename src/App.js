import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

// const People = ({ names, searchFilter }) => {

//   const peopleToShow = searchFilter ? names.filter(name => name.name.toLowerCase().includes(searchFilter.toLowerCase())) : names

//   return (
//     <div>
//       <h2>Numbers</h2>
//       {peopleToShow.map(name => <div key={name.name} > {name.name} {name.number} </div>)}
//     </div>
//   )
// }

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('enter name..')
  const [newNumber, setNewNumber] = useState('enter number..')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })

  })

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
    
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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