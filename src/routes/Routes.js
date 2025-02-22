import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlueprintDashboard from '../components/Dashboard';
import HistoricSummaryReport from '../components/Historic-Summary';
import Landing from '../components/landing';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/blueprint" element={<BlueprintDashboard />} />
        <Route path="/historic-summary" element={<HistoricSummaryReport />} />
        <Route path="/" element={<Landing/>} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;