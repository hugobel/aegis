import React from "react";
import { FiltersPanel, PerformancePanel, RadarPanel } from "containers/panels";

const App: React.FC = () => (
  <div className="app">
    <FiltersPanel />
    <PerformancePanel />
    <RadarPanel />
  </div>
);

export default App;
