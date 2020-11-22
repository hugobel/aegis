import React from "react";
import { FiltersPanel, RadarPanel, PerformancePanel } from "containers/panels";

function App() {
  return (
    <div className="App">
      <FiltersPanel />
      <PerformancePanel />
      <RadarPanel />
    </div>
  );
}

export default App;
