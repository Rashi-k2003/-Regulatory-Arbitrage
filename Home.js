import React from "react";

function Home({ onStart }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Regulatory Arbitrage Explorer</h1>
      <button onClick={onStart} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Start Simulation
      </button>
    </div>
  );
}

export default Home;