import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  // findIndex callback
  const isEqualName = (person) => person.name === newName

  // OnSubmit handler
  const addPerson = (event) => {
      const newPerson = {
        name: newName
      }
      event.preventDefault()

      if(persons.findIndex(isEqualName) !== -1)
          window.alert(`"${newName}" is already registered`)
      else
        {      
        setPersons(persons.concat(newPerson))
        setNewName('')
        }
  }

  // OnChange handler
  const changePersonInput = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange = {changePersonInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map (p => <Person key={p.name} person = {p}/> )}
    </div>
  )
}

export default App