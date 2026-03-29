import React, { useState } from "react";
import Home from "./pages/Home";
import Simulation from "./pages/Simulation";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      {page === "home" && <Home onStart={() => setPage("simulation")} />}
      {page === "simulation" && <Simulation />}
    </div>
  );
}

export default App;