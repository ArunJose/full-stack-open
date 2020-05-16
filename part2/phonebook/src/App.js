import React, { useState } from "react";

const Persons = ({ persons, filterString }) => {
  return (
    <ul>
      {persons.map((person) => {
        const personNameUpper = person.name.toUpperCase();
        return filterString ? (
          personNameUpper.includes(filterString.toUpperCase()) && (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          )
        ) : (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        );
      })}
    </ul>
  );
};

const PersonForm = ({
  handleNewNameChange,
  handleNewNumChange,
  addNewName,
  newName,
  newNum,
}) => {
  return (
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
  );
};

const Filter = ({ filterString, handleFilterStringChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filterString} onChange={handleFilterStringChange} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterString, setFilterString] = useState("");

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleFilterStringChange = (e) => {
    setFilterString(e.target.value);
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
      <Filter
        handleFilterStringChange={handleFilterStringChange}
        filterString={filterString}
      />
      <h2>Add a new number</h2>
      <PersonForm
        handleNewNumChange={handleNewNumChange}
        handleNewNameChange={handleNewNameChange}
        addNewName={addNewName}
        newName={newName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterString={filterString} />
    </div>
  );
};

export default App;
