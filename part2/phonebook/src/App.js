import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

// set the data fetch effect
useEffect(() => 
  personService
    .getAll()
    .then((allPersons) => {
        setPersons(allPersons)
    })
,[])

  // findIndex Person Equal callback
  const isEqualName = (person) => person.name === newName

  // OnSubmit handler
  const addPerson = (event) => {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      event.preventDefault()

      if(persons.findIndex(isEqualName) !== -1)
      // person.name already exists
        {
        const changePerson = persons.find(n => n.name === newPerson.name)
        if(window.confirm(`"${newName}" is already registered, replace the number?`))
          {
          personService
            .update(changePerson.id, newPerson)
            .then(returnedPerson =>
              {
              setPersons(persons.map(person => person.id !== changePerson.id ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
            })
          }
        }
      else
        {      
        personService
          .create(newPerson)
          .then(returnedPerson =>
            {
            console.log ('add', returnedPerson)
            setPersons(persons.concat(returnedPerson))
            console.log('set nach add', persons)
            setNewName('')
            setNewNumber('')
          })
        }
  }

  // delete the selected person after confirmation
  //
  const removePerson = (id) => {    
    console.log('removePerson', id)
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  // OnChange handler
  const changePersonInput = (event) => {
    setNewName(event.target.value)
  }

  // OnChange handler
  const changeNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  // OnChange handler
  const changeSearchInput = (event) => {
    setNewSearch(event.target.value)
  }

  const filteredPersons = newSearch === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
          newsearch={newSearch} 
          changeSearchInput={changeSearchInput}
      />

      <h2>Add a new</h2>
      <AddPerson 
          addHandler={addPerson} 
          changePersonHandler={changePersonInput} 
          changeNumberHandler={changeNumberInput}
          newName={newName}
          newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} remove={removePerson} />
    </div>
  )
}

export default App