const Filter = ({searchFilter, searchChange}) => {
    return (      
    <div>
        filter shown with:
        <input value={searchFilter} onChange={searchChange} />
    </div>)
}

export default Filter