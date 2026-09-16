function FilterInput ({filterTerm, onFilterChange}){
    
    return(
        <div className="todo-control-group">
            <label htmlFor="filterInput">Search:</label>
            <input 
                id='filterInput'
                type='text'
                value={filterTerm}
                onChange= {(event) => onFilterChange(event.target.value)}
                placeholder='Search by title...'
                maxLength={100}
            />
        </div>
    )
}

export default FilterInput;