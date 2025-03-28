// HomePage.js - Web Version
// This component displays individual animals available for adoption
// Users can navigate through animals and click to see more details

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchAnimals, fetchRescueGroups } from '../services/api';
import '../styles/HomePage.css';

const HomePage = () => {
  // Get rescue group from URL params
  const { rescueGroup } = useParams();
  const navigate = useNavigate();
  
  // State for animal data
  const [animals, setAnimals] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rescueGroupName, setRescueGroupName] = useState("");
  const location = useLocation();
  
  // Current animal being displayed
  const currentAnimal = animals[currentIndex];
  
  // Fetch animals from API
  useEffect(() => {
    const loadAnimals = async () => {
      try {
        setLoading(true);
        // Parse the rescue group ID (assuming it's a number)
        const rescueGroupId = parseInt(rescueGroup) || 1;
        
        // Get query parameters
        const queryParams = new URLSearchParams(location.search);
        const filterParams = {};
        
        // Extract filter parameters and add them to the filter object
        for(const [key, value] of queryParams.entries()) {
          filterParams[key] = value === 'true' ? true : value;
        }
        
        // Fetch rescue group data to get the name
        const rescueGroups = await fetchRescueGroups();
        const currentRescueGroup = rescueGroups.find(group => group.id === rescueGroupId);
        if (currentRescueGroup) {
          setRescueGroupName(currentRescueGroup.name);
        }
        
        // Fetch animals with filters
        const data = await fetchAnimals(rescueGroupId, filterParams);
        setAnimals(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching animals:', error);
        setLoading(false);
      }
    };
    
    loadAnimals();
  }, [rescueGroup, location.search]);
  
  // Navigate to previous animal
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  // Navigate to next animal
  const goToNext = () => {
    if (currentIndex < animals.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // Navigate to details page for current animal
  const goToDetails = () => {
    navigate(`/details/${currentAnimal.id}`);
  };
  
  // Navigate to filter page
  const goToFilter = () => {
    navigate(`/filter/${rescueGroup}`);
  };
  
  // Display loading state if data is not ready
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading animals...</p>
      </div>
    );
  }
  
  // Display message if no animals found
  if (!animals.length) {
    return (
      <div className="no-animals-container">
        <h2>No animals found</h2>
        <p>There are no animals available for this rescue group at the moment.</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="header">
        <h2 className="rescue-group-name">{rescueGroupName}</h2>
        <button onClick={goToFilter} className="filter-button">
          Filter
        </button>
      </div>
      
      <div className="animal-card">
        {/* Animal Image */}
        <div className="image-container">
          <img
            className="animal-image"
            src={currentAnimal.image || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={currentAnimal.name}
          />
        </div>
        
        {/* Animal Basic Information */}
        <div className="info-container">
          <h2 className="animal-name">{currentAnimal.name}</h2>
          <p className="animal-breed">{currentAnimal.breed} • {currentAnimal.age}</p>
          <p className="animal-details">{currentAnimal.gender} • {currentAnimal.size}</p>
          <p className="animal-description">{currentAnimal.description}</p>
        </div>
        
        {/* Navigation buttons */}
        <div className="navigation-buttons">
          <button 
            onClick={goToPrevious} 
            disabled={currentIndex === 0}
            className="nav-button prev-button"
          >
            &larr; Previous
          </button>
          
          <button onClick={goToDetails} className="details-button">
            More Information
          </button>
          
          <button 
            onClick={goToNext} 
            disabled={currentIndex === animals.length - 1}
            className="nav-button next-button"
          >
            Next &rarr;
          </button>
        </div>
      </div>
      
      {/* Pagination indicators */}
      <div className="pagination">
        {animals.map((_, index) => (
          <span
            key={index}
            className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      
      <p className="navigation-help">
        Use arrow buttons to navigate between animals
      </p>
    </div>
  );
};

export default HomePage;