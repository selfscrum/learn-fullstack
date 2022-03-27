import { useState } from 'react'
import Person from './components/Person'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

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
          window.alert(`"${newName}" is already registered`)
      else
        {      
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App