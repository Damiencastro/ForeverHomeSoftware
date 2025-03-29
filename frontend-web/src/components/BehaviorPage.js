// BehaviorPage.js - Web Version
// This component displays behavior-related information about an animal
// It follows the same layout pattern as the Details and Health pages

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAnimalById, fetchAnimalBehavior } from '../services/api';
import '../styles/BehaviorPage.css';
import AnimalImage from './AnimalImage';

const BehaviorPage = () => {
  // Get animal ID from URL params
  const { animalId } = useParams();
  const navigate = useNavigate();
  
  // State for animal data and behavior information
  const [animal, setAnimal] = useState(null);
  const [behaviorInfo, setBehaviorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch animal details and behavior information
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const animalData = await fetchAnimalById(parseInt(animalId));
        const behaviorData = await fetchAnimalBehavior(parseInt(animalId));
        
        setAnimal(animalData);
        setBehaviorInfo(behaviorData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching animal behavior information:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, [animalId]);
  
  // Go back to previous page
  const goBack = () => {
    navigate(-1);
  };
  
  // Navigate to other detail pages
  const goToDetails = () => {
    navigate(`/details/${animalId}`);
  };
  
  const goToHealth = () => {
    navigate(`/health/${animalId}`);
  };
  
  // Display loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading behavior information...</p>
      </div>
    );
  }
  
  // Display error message if data not found
  if (!animal || !behaviorInfo) {
    return (
      <div className="error-container">
        <h2>Information Not Found</h2>
        <p>We couldn't find behavior information for this animal.</p>
        <button onClick={goBack} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="behavior-container">
      {/* Header with back button and page title */}
      <div className="behavior-header">
        <button onClick={goBack} className="back-button">
          &larr; Back
        </button>
        <h1 className="behavior-title">{animal.name}'s Behavior</h1>
        <div className="spacer"></div> {/* Empty div for spacing */}
      </div>
      
      <div className="behavior-content">
        {/* Small animal image for reference */}
        <div className="behavior-image-container">
          <AnimalImage
            animal={animal}
            className="behavior-animal-image"
          />
        </div>
        
        {/* Temperament Section */}
        <div className="behavior-section">
          <h2 className="section-title">Temperament</h2>
          <div className="temperament-grid">
            <div className="temperament-item">
              <span className="temperament-label">Energy Level</span>
              <span className="temperament-value">{behaviorInfo.energy_level}</span>
            </div>
            <div className="temperament-item">
              <span className="temperament-label">Affection Level</span>
              <span className="temperament-value">{behaviorInfo.affection_level}</span>
            </div>
            <div className="temperament-item">
              <span className="temperament-label">Sociability</span>
              <span className="temperament-value">{behaviorInfo.sociability}</span>
            </div>
            <div className="temperament-item">
              <span className="temperament-label">Independence</span>
              <span className="temperament-value">{behaviorInfo.independence}</span>
            </div>
          </div>
        </div>
        
        {/* Compatibility Section */}
        <div className="behavior-section">
          <h2 className="section-title">Compatibility</h2>
          <div className="compatibility-container">
            <div className="compatibility-item">
              <span className="compatibility-label">Children</span>
              <div className="rating-container">
                <div className="rating-bar" style={{ width: getRatingPercentage(animal.childsafe_id, 4) }}></div>
              </div>
              <span className="compatibility-note">{animal.childsafe}</span>
            </div>
            
            <div className="compatibility-item">
              <span className="compatibility-label">Dogs</span>
              <div className="rating-container">
                <div className="rating-bar" style={{ width: getRatingPercentage(animal.dogsafe_id, 4) }}></div>
              </div>
              <span className="compatibility-note">{animal.dogsafe}</span>
            </div>
            
            <div className="compatibility-item">
              <span className="compatibility-label">Cats</span>
              <div className="rating-container">
                <div className="rating-bar" style={{ width: getRatingPercentage(animal.catsafe_id, 3) }}></div>
              </div>
              <span className="compatibility-note">{animal.catsafe}</span>
            </div>
          </div>
        </div>
        
        {/* Training Status Section */}
        <div className="behavior-section">
          <h2 className="section-title">Training Status</h2>
          <div className="training-grid">
            <div className="training-item">
              <span className="training-label">House Trained</span>
              <span className="training-value">{animal.housetrained}</span>
            </div>
            <div className="training-item">
              <span className="training-label">Obedience Level</span>
              <span className="training-value">{behaviorInfo.obedience_level}</span>
            </div>
            <div className="training-item">
              <span className="training-label">Known Commands</span>
              <span className="training-value">{behaviorInfo.known_commands || 'Basic commands'}</span>
            </div>
          </div>
        </div>
        
        {/* Behavioral Notes Section */}
        <div className="behavior-section">
          <h2 className="section-title">Behavioral Notes</h2>
          <p className="behavior-description">
            {behaviorInfo.behavioral_notes || 
              `${animal.name} is a friendly and sociable companion who enjoys meeting new people and other dogs.
              Has been working on leash manners and is improving steadily. Responds well to positive reinforcement
              training methods and treats as rewards.
              Enjoys puzzle toys and interactive games that provide mental stimulation.`
            }
          </p>
        </div>
        
        {/* Ideal Home Section */}
        <div className="behavior-section">
          <h2 className="section-title">Ideal Home Environment</h2>
          <p className="behavior-description">
            {behaviorInfo.ideal_home || 
              `Would thrive in an active household with a fenced yard where ${animal.name} can play safely.
              Best suited for a family with older children who understand how to interact with dogs properly.
              Would benefit from a family that can provide consistent training, regular exercise, and plenty of 
              love and attention.`
            }
          </p>
        </div>
        
        {/* Navigation buttons for other detail screens */}
        <div className="behavior-navigation-buttons">
          <button className="behavior-nav-button" onClick={goToDetails}>
            Basic Details
          </button>
          <button className="behavior-nav-button" onClick={goToHealth}>
            Health Details
          </button>
        </div>
        
        {/* Training Tips */}
        <div className="tip-section">
          <h2 className="section-title">Training Tips</h2>
          <p className="tip-text">
            Consistency is key when working with {animal.name}. Using positive reinforcement 
            and reward-based training has been very effective. Short, regular training sessions 
            (10-15 minutes) several times a day will yield the best results.
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate rating percentage based on ID
function getRatingPercentage(id, maxId) {
  if (!id) return '0%';
  // Reverse the scale (lower ID means better compatibility)
  const percentage = ((maxId - id + 1) / maxId) * 100;
  return `${percentage}%`;
}

export default BehaviorPage;