import Country from './Country'

const Countries = ({ countries, searchFilter, setSearch}) => {
  const countriesToShow = searchFilter ? countries.filter(country => country.name.common.toLowerCase().includes(searchFilter.toLowerCase())) : countries
  

  if(countriesToShow.length > 10) {
    return(
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }

  if(countriesToShow.length === 1) {
    return (
    <Country country={countriesToShow[0]} />
    )
  }
  return (
    <div>
      {countriesToShow.map(country => <div key={country.latlng} > {country.name.common} <button onClick={() => setSearch(country.name.common)}>show</button> </div>)}
    </div>
    )
  }

export default Countries