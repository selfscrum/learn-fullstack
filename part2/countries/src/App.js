import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries  from './components/Countries'
import SearchCountry  from './components/SearchCountry'


const App = () => {  

  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState('')

  const showHandler = (event) => {
    setSearchString(event.target.id)
  }

  const changeHandler = (event) => {
    setSearchString(event.target.value)
  }

  useEffect (() =>
    {
      if (searchString !== '')
        axios
        .get(`https://restcountries.com/v3.1/name/${searchString}/`)
        .then(response => 
          setCountries(response.data)
        )
    }
  ,[searchString])

  return (
    <>
      <SearchCountry search={searchString} changeHandler={changeHandler} />
      <Countries countries={countries} showHandler={showHandler}/>
    </>
  )
}

export default App 