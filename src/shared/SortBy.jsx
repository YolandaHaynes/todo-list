function SortBy({sortBy, sortDirection, onSortByChange, onSortDirectionChange}){
    return(
        <div>
            <label htmlFor="sortBy">Sort by</label>
              <select
                id='sortBy'
                value={sortBy}
                onChange={(event) => onSortByChange(event.target.value)}
            >
                <option value="createdAt">Created At</option>
                <option value="title">Title</option>
            </select>

            <label htmlFor="order">Order</label>
              <select
                id='order'
                value={sortDirection}
                onChange={(event) => onSortDirectionChange(event.target.value)}
            >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
            </select>
      </div>
    );

}

export default SortBy