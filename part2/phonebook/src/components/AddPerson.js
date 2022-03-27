import React from 'react'

const AddPerson = (props) => {
return (
    <form onSubmit={props.addHandler}>
    <div>
      name: <input value={props.newName} onChange = {props.changePersonHandler}/>
    </div>
    <div>
      number: <input value={props.newNumber} onChange = {props.changeNumberHandler}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)}

export default AddPerson
