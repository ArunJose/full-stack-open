import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = val => {
    setGood(val);
  };
  const setToNeutral = val => {
    setNeutral(val);
  };
  const setToBad = val => {
    setBad(val);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setToGood(good + 1)}>Good</button>
      <button onClick={() => setToNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setToBad(bad + 1)}>Bad</button>
      <h1>Statistics</h1>
      <p>
        good {good} <br /> neutral {neutral} <br /> bad {bad}
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
