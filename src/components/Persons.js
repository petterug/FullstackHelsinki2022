import Button from './Button'

const Persons = ({ names, searchFilter, deletePerson }) => {

    const peopleToShow = searchFilter ? names.filter(name => name.name.toLowerCase().includes(searchFilter.toLowerCase())) : names
  
    return (
      <div>
        {peopleToShow.map(name => <div className='list' key={name.name}>{name.name} {name.number}<Button text={'delete'} person={name} onClick={deletePerson} /> </div>)}
      </div>
    )
  }

export default Persons