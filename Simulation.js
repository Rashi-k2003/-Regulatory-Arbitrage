import React, { useState } from "react";

function Simulation() {
  const [countryA, setCountryA] = useState("");
  const [countryB, setCountryB] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const handleSimulate = async () => {
  try {
    const response = await fetch("http://localhost:5000/simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        countryA,
        countryB,
        amount
      })
    });

    const data = await response.json();
    setResult(data);

  } catch (error) {
    console.error("Error:", error);
    alert("Backend not connected. Check server.");
  }
};

  return (
    <div style={{
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>

      <h3>Scenario:</h3>
      <p>Move funds from high-tax country to low-tax country legally</p>

      <h2>Simulation</h2>

      <select onChange={(e) => setCountryA(e.target.value)} style={{ width: "100%", padding: "10px" }}>
        <option value="">Select Country A</option>
        <option>India</option>
        <option>Singapore</option>
        <option>Dubai</option>
      </select>

      <br /><br />

      <select onChange={(e) => setCountryB(e.target.value)} style={{ width: "100%", padding: "10px" }}>
        <option value="">Select Country B</option>
        <option>India</option>
        <option>Singapore</option>
        <option>Dubai</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Enter Investment Amount"
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <button 
        onClick={handleSimulate}
        style={{
          padding: "10px",
          width: "100%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Simulate
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result</h3>
          <p>Tax Saved: ₹{result.savings}</p>
          <p>Message: {result.message}</p>
          <p>Compliance: {result.compliance}</p>
          <p>Score: {result.savings > 0 ? 100 : 50}</p>
        </div>
      )}

    </div>
  );
}

export default Simulation;