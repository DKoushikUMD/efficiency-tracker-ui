import React from 'react';
import RoutesComponent from '../src/routes/routes';
import Header from './components/header';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <RoutesComponent />
      </main>
    </div>
  );
}

export default App;
