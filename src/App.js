import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })

  }, [])


  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <div>
      <Filter value={searchFilter} searchChange={handleSearchChange}  />
      <Countries countries={countries} searchFilter={searchFilter}/>
    </div>
  )
}

export default App