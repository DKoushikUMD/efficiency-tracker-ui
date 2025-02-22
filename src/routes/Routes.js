// src/routes/Routes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default RoutesComponent;
