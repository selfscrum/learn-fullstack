import React from 'react'
import Person from './Person'

const Persons = ({ persons, remove }) => persons.map (p => <Person key={p.name} person = {p} remove={()=>remove(p.id)}/> )

export default Persons
