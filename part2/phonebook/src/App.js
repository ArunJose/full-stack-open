import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const addNewName = (e) => {
    e.preventDefault();
    setPersons([...persons, { name: newName }]);
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return <li>{person.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
