import React from 'react'

const Filter = ({ newSearch, changeSearchInput }) => {
return (
    <form>
    <div>
      filter shown with <input value={newSearch}  onChange= {changeSearchInput}/>
    </div>
  </form>
)}

export default Filter
