import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries  from './components/Countries'
import SearchCountry  from './components/SearchCountry'


const App = () => {  

  const weather_api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [searchString, setSearchString] = useState('')
  const [geo, setGeo] = useState({long: 0, lat: 0})
  const [countriesWithWeather, setCountriesWithWeather] = useState([])
  
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
        .then(response => {
            const countries = response.data
            setCountries(countries)
            setCountriesWithWeather(countries)
            if (countries.length === 1)
              setGeo({long: countries[0].capitalInfo.latlng[1], lat:countries[0].capitalInfo.latlng[0]})
            else
              setGeo({long:0, lat:0})
        }
        )
    }
  ,[searchString])

  useEffect (() =>
    {
      console.log('geo', geo)
      if (geo.long !== 0 && geo.lat !== 0)
        axios
        .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${geo.lat}&lon=${geo.long}&appid=${weather_api_key}&units=metric`)
        .then(response => {
            console.log('res',response.data)
            const weatherOfInterest = {woi_temp: response.data.current.temp, woi_wind_speed: response.data.current.wind_speed, woi_icon: response.data.current.weather[0].icon}
            const cw = countries.map((data) => ({...data, ...weatherOfInterest}))
            setCountriesWithWeather(cw)
          }
        )
    }
  ,[geo])


  return (
    <>
      <SearchCountry search={searchString} changeHandler={changeHandler} />
      <Countries countries={countriesWithWeather} showHandler={showHandler}/>
    </>
  )
}

export default App 