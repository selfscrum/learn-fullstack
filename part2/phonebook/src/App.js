import { useState } from 'react'
import Person from './components/Person'

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

      <form>
        <div>
          filter shown with <input value={newSearch}  onChange= {changeSearchInput}/>
        </div>
        <h2>add a new</h2>
      </form>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange = {changePersonInput}/>
        </div>
        <div>
          number: <input value={newNumber} onChange = {changeNumberInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
        {filteredPersons.map (p => <Person key={p.name} person = {p}/> )}
    </div>
  )
}

export default App