import React from 'react'

const Person = ({ person, remove }) => <p>{person.name} {person.number} <button onClick={remove}>Delete</button></p>

export default Person
