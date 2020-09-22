import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm.js";
import Filter from "./components/Filter.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterString, setFilterString] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleFilterStringChange = (e) => {
    setFilterString(e.target.value);
  };

  const handleNewNumChange = (e) => {
    setNewNum(e.target.value);
  };

  const handleRemove = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const addNewName = (e) => {
    e.preventDefault();
    let existingPerson = false;
    if ((existingPerson = persons.find((person) => person.name === newName))) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with a new one?`
        )
      ) {
        personService
          .update(existingPerson.id, { ...existingPerson, number: newNum })
          .then((updatedPerson) => {
            setPersons([
              ...persons.filter((p) => p.id !== updatedPerson.id),
              updatedPerson,
            ]);
            setNewName("");
            setNewNum("");
          })
          .catch((error) => {
            setNotification({
              message: `Contact '${existingPerson.name}' was already removed from server`,
              color: "red",
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
          });
      }
    } else {
      const newPerson = { name: newName, number: newNum };
      personService.create(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewNum("");
        setNewName("");
        setNotification({
          message: `Added '${createdPerson.name}' to the phonebook`,
          color: "green",
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
        newNum={newNum}
      />
      <h2>Numbers</h2>
      {persons.length > 0 && (
        <Persons
          persons={persons}
          filterString={filterString}
          handleRemove={handleRemove}
        />
      )}
    </div>
  );
};

export default App;
