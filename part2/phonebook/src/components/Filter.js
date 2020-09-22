import React from "react";

const Filter = ({ filterString, handleFilterStringChange }) => {
  return (
    <div>
      Filter shown with{" "}
      <input value={filterString} onChange={handleFilterStringChange} />
    </div>
  );
};

export default Filter;
