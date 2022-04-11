import { useState } from 'react'

const People = ({ names }) => {
  console.log(names);
  return (
    <div>
      {names.map(name => <div key={name.name} > {name.name} </div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('enter name..')

  const addName = (event) => {
    event.preventDefault()

    if( persons.findIndex((element) => element.name == newName) !== -1) {
      return alert(`${newName} is already added to the phonebook`)
    }

    const newPerson = {
      name: newName
    }
    
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNameChange = (event) => {
    
    setNewName(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People names={persons} />
    </div>
  )
}

export default App