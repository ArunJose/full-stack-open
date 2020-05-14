import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "8888-3333-444" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumChange = (e) => {
    setNewNum(e.target.value);
  };

  const addNewName = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: newNum }]);
      setNewName("");
      setNewNum("");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number: <input value={newNum} onChange={handleNewNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
