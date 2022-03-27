import React from 'react'

const SearchCountry = ({search,changeHandler}) => (
            <div>
                find countries <input value={search} onChange={changeHandler} />
            </div>

)

export default SearchCountry
