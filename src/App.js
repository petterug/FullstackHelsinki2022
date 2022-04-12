import { useState } from 'react'

const People = ({ names, searchFilter }) => {

  const peopleToShow = searchFilter ? names.filter(name => name.name.toLowerCase().includes(searchFilter.toLowerCase())) : names

  return (
    <div>
      <h2>Numbers</h2>
      {peopleToShow.map(name => <div key={name.name} > {name.name} {name.number} </div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('enter name..')
  const [newNumber, setNewNumber] = useState('enter number..')
  const [searchFilter, setSearchFilter] = useState('')

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
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input value={searchFilter} onChange={handleSearchChange} />
      </div>
      
      <h2>Add new person</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <People names={persons} searchFilter={searchFilter} />
    </div>
  )
}

export default App