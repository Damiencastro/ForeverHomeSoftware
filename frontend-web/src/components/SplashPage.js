// SplashPage.js - Web Version
// This component serves as the entry point to the application
// It displays the app name and allows users to search for a rescue group

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRescueGroups } from '../services/api';
import '../styles/SplashPage.css';

const SplashPage = () => {
  // State for rescue groups and selected rescue group
  const [rescueGroups, setRescueGroups] = useState([]);
  const [selectedRescueGroup, setSelectedRescueGroup] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Fetch rescue groups when component mounts
  useEffect(() => {
    const loadRescueGroups = async () => {
      try {
        setLoading(true);
        const groups = await fetchRescueGroups();
        console.log(groups);
        setRescueGroups(groups);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rescue groups:', error);
        setLoading(false);
      }
    };
    
    loadRescueGroups();
  }, []);
  
  // Function to handle submission of the rescue group selection
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRescueGroup) {
      // Navigate to the home page with the selected rescue group ID
      navigate(`/home/${selectedRescueGroup}`);
    }
  };

  return (
    <div className="splash-container">
      {/* App Logo */}
      <div className="logo-container">
        <h1 className="app-title">Forever Home</h1>
      </div>
      
      {/* Welcome Message */}
      <p className="welcome-text">
        Find your perfect companion waiting for their forever home
      </p>
      
      {/* Rescue Group Dropdown Form */}
      <div className="search-container">
        {loading ? (
          <div className="loading-indicator">Loading rescue groups...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <select
              className="rescue-dropdown"
              value={selectedRescueGroup}
              onChange={(e) => setSelectedRescueGroup(e.target.value)}
            >
              <option value="">Select a rescue group</option>
              {rescueGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
            <button 
              className="search-button"
              type="submit"
              disabled={!selectedRescueGroup}
            >
              View Animals
            </button>
          </form>
        )}
      </div>
      
      {/* Featured Rescue Groups */}
      {!loading && rescueGroups.length > 0 && (
        <div className="featured-container">
          <h2 className="featured-title">Featured Rescue Groups</h2>
          <div className="featured-groups">
            {rescueGroups.map((group) => (
              <div 
                key={group.id} 
                className="featured-group" 
                onClick={() => setSelectedRescueGroup(group.id.toString())}
              >
                {group.name}
                <div className="group-location">{group.location}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashPage;