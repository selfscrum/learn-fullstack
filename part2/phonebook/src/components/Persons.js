import React from 'react'
import Person from './Person'

const Persons = ({ persons }) => persons.map (p => <Person key={p.name} person = {p}/> )

export default Persons
