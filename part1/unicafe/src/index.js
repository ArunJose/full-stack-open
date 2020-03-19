import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const positive = (good * 100) / total;

  //(good * 1) + (neutral * 0) + (bad * -1) => good - bad
  const average = (good - bad) / total;

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <h1>Statistics</h1>
      <p>
        good {good} <br /> neutral {neutral} <br /> bad {bad} <br />
        all {total} <br />
        average {isNaN(average) ? 0 : average}
        <br />
        positive {isNaN(positive) ? 0 : positive}%
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
