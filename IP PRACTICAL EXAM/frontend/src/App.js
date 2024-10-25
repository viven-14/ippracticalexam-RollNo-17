import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [name, setName] = useState("");  // State to store the name
  const [basicSalary, setBasicSalary] = useState("");
  const [netSalary, setNetSalary] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    try {
      const response = await axios.post("http://localhost:5000/calculate", {
        name,
        basicSalary: parseFloat(basicSalary),
      });

      setNetSalary(response.data.netSalary);
    } catch (err) {
      setError("Error calculating salary. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>Quick Salary Estimator</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label>Basic Salary:</label>
        <input
          type="number"
          value={basicSalary}
          onChange={(e) => setBasicSalary(e.target.value)}
          placeholder="Enter your basic salary"
          required
        />
        <button type="submit">Calculate</button>
      </form>

      {netSalary && (
        <div className="result">
          <h2>{name}, your Estimated Net Salary is: ₹{netSalary}</h2>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
