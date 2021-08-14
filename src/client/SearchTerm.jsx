import React from 'react'

const SearchTerm = ({ handleChange, searchTerm, handleSearchTermSubmit }) => (
    <form className="row g-3 searchTerm" onSubmit={handleSearchTermSubmit}>
        <div className="col-auto">
            <input type="text" name='searchTerm' className="form-control" id="searchTerm" placeholder="insert game title..." value={searchTerm} onChange={handleChange}/>
        </div>
        <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">Search</button>
        </div>
    </form>

)

export default SearchTerm