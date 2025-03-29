// App.js - Web Version
// This is the main entry point for the application
// It sets up routing and provides a layout for all pages

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SplashPage from './components/SplashPage';
import HomePage from './components/HomePage';
import DetailsPage from './components/DetailsPage';
import HealthPage from './components/HealthPage';
import BehaviorPage from './components/BehaviorPage';
import FilterPage from './components/FilterPage';
import './App.css';
import './styles/styles.css';

function App() {
  return (
    <div className="app">
      <Router>
        <div className="app-header">
          <div className="header-content">
            <Link to="/" className="app-title-link">
              <h1 className="app-title">Forever Home</h1>
            </Link>
          </div>
        </div>
        
        <div className="app-content">
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/home/:rescueGroup" element={<HomePage />} />
            <Route path="/details/:animalId" element={<DetailsPage />} />
            <Route path="/health/:animalId" element={<HealthPage />} />
            <Route path="/behavior/:animalId" element={<BehaviorPage />} />
            <Route path="/filter/:rescueGroup" element={<FilterPage />} />
          </Routes>
        </div>
        
        <div className="app-footer">
          <p>© 2025 Forever Home Software | Created for Spring 2025 Hackathon for Good</p>
        </div>
      </Router>
    </div>
  );
}

export default App;