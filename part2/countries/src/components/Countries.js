import React from 'react'

const Countries = ({countries}) => { 
    if (countries.length > 10)
        return <div>Too many matches, specify another filter.</div>
    else if (countries.length === 1)
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
            </>
        )
    else
        return countries.map(country => <Country key={country.cca2} country={country} /> )
}

const Language = ({ lang }) => <li>{lang}</li>
const Country = ({ country }) => <p>{country.name.common}</p>

export default Countries
