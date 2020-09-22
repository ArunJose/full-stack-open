import React from "react";

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
        name:{" "}
        <input
          value={newName}
          onChange={handleNewNameChange}
          name="contactName"
        />
      </div>
      <div>
        number:{" "}
        <input value={newNum} onChange={handleNewNumChange} name="contactNum" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
