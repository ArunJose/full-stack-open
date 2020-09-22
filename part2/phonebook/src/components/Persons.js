import React from "react";

const Person = ({ name, number }) => (
  <span>
    {name} {number}
  </span>
);

const Persons = ({ persons, filterString, handleRemove }) => {
  return (
    <ul>
      {persons.map((person) => {
        const personNameUpper = person.name.toUpperCase();
        return filterString ? (
          personNameUpper.includes(filterString.toUpperCase()) && (
            <li key={person.name}>
              <Person name={person.name} number={person.number} />{" "}
              <button onClick={() => handleRemove(person.id)}>Delete</button>
            </li>
          )
        ) : (
          <li key={person.id}>
            <Person name={person.name} number={person.number} />
            <button onClick={() => handleRemove(person.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
