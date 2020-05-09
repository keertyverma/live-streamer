import React from 'react';
import './App.css';
import SensorDataList from "./components/sensor-data.component";

function App() {
  return (
    <div>
      <h1>Live Data stream</h1>
      <SensorDataList />
    </div>
  );
}

export default App;