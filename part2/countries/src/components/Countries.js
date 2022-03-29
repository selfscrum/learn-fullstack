import React from 'react'

const Countries = ({countries, showHandler}) => { 
    if (countries.length > 10)
        return <div>Too many matches, specify another filter.</div>
    else if (countries.length === 1) {
        console.log(countries[0])
        return (
            <>
                <h1>{countries[0].name.common}</h1>
                <p>capital {countries[0].capital}</p>
                <p>area {countries[0].area}</p>
                <p><strong>languages:</strong></p>
                <ul>
                {Object.keys(countries[0].languages).map(key => <Language key={key} lang= {countries[0].languages[key]} />)}
                </ul>
                <img src={countries[0].flags.png} alt='flag' />
                <h2>Weather in {countries[0].capital}</h2>
                <p>temperature {countries[0].woi_temp} Celsius</p>
                <img src={'https://openweathermap.org/img/wn/'+countries[0].woi_icon+'@2x.png'} alt='weather' />
                <p>wind {countries[0].woi_wind_speed} m/s</p>
            </>
        )
    }
    else
        return countries.map(country => <Country key={country.cca2} country={country} button={showHandler}/> )
}

const Language = ({ lang }) => <li>{lang}</li>
const Country = ({ country, button }) => (
    <p>{country.name.common} <button id={country.name.common} onClick={button}>show</button></p>
)

export default Countries
