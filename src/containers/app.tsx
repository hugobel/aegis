import React from 'react';
import { Slicers, PerformancePanel, RadarPanel } from 'containers/panels';

export const App: React.FC = () => (
  <div className="app">
    <Slicers />
    <PerformancePanel />
    <RadarPanel />
  </div>
);

export default App;
