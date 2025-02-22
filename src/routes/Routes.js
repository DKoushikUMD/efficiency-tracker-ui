import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlueprintDashboard from '../components/Dashboard';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlueprintDashboard />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default RoutesComponent;