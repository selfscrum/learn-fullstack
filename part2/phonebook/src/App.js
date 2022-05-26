import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)

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
            .catch(error => {
              setErrMessage(error.response.data.error)
              //              setErrMessage(`Person '${newPerson.name}' was already removed from server`)
              setTimeout(() => {
                setErrMessage(null)        
              }, 5000)
              setPersons(persons.filter(person => person.id !== changePerson.id))    
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
            console.log('set nach add', returnedPerson)
            setNewName('')
            setNewNumber('')
            setMessage(`Adding ${returnedPerson.name} was successful.`)
            setTimeout(() => {
              setMessage(null)        
            }, 5000)
          })
          .catch(error => {
            console.log(error)
            setErrMessage(error.response.data.error)
            setTimeout(() => {
              setErrMessage(null)        
            }, 5000)
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
      <Notification message={errMessage} message_class='error'/>
      <Notification message={message} message_class='success'/>
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