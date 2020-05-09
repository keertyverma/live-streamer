import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SensorDataList from "./components/sensor-data.component";

function App() {
  return (
    <div className="container">
      <h1>Live Data stream</h1>
      <SensorDataList />
    </div>
  );
}

export default App;