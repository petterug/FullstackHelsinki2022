
const Persons = ({ names, searchFilter }) => {

    const peopleToShow = searchFilter ? names.filter(name => name.name.toLowerCase().includes(searchFilter.toLowerCase())) : names
  
    return (
      <div>
        {peopleToShow.map(name => <div key={name.name} > {name.name} {name.number} </div>)}
      </div>
    )
  }

export default Persons