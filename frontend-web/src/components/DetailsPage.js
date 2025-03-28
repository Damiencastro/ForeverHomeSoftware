// DetailsPage.js - Web Version
// This component displays detailed information about an animal
// Users can navigate to other detail screens from here

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAnimalById } from '../services/api';
import '../styles/DetailsPage.css';

const DetailsPage = () => {
  // Get animal ID from URL params
  const { animalId } = useParams();
  const navigate = useNavigate();
  
  // Animal data state
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch animal details
  useEffect(() => {
    const loadAnimalDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchAnimalById(parseInt(animalId));
        setAnimal(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching animal details:', error);
        setLoading(false);
      }
    };
    
    loadAnimalDetails();
  }, [animalId]);
  
  // Navigate to Health page
  const goToHealth = () => {
    navigate(`/health/${animalId}`);
  };
  
  // Navigate to Behavior page
  const goToBehavior = () => {
    navigate(`/behavior/${animalId}`);
  };
  
  // Go back to Home page
  const goBack = () => {
    navigate(-1);
  };
  
  // Display loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading details...</p>
      </div>
    );
  }
  
  // Display error message if animal not found
  if (!animal) {
    return (
      <div className="error-container">
        <h2>Animal Not Found</h2>
        <p>The animal you're looking for doesn't exist or has been removed.</p>
        <button onClick={goBack} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="details-container">
      {/* Header with back button and animal name */}
      <div className="details-header">
        <button onClick={goBack} className="back-button">
          &larr; Back
        </button>
        <h1 className="details-title">{animal.name}</h1>
        <div className="spacer"></div> {/* Empty div for spacing */}
      </div>
      
      <div className="details-content">
        {/* Animal image (smaller than on home page) */}
        <div className="details-image-container">
          <img
            className="details-animal-image"
            src={animal.image || 'https://via.placeholder.com/400x200?text=No+Image'}
            alt={animal.name}
          />
        </div>
        
        {/* Basic Information Section */}
        <div className="details-section">
          <h2 className="section-title">About {animal.name}</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Breed</span>
              <span className="info-value">{animal.breed}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age</span>
              <span className="info-value">{animal.age}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{animal.gender}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Size</span>
              <span className="info-value">{animal.size}</span>
            </div>
            
            {/* Additional attributes */}
            <div className="info-item">
              <span className="info-label">Color</span>
              <span className="info-value">{animal.color || 'Not specified'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Coat</span>
              <span className="info-value">{animal.coatLength || 'Not specified'}</span>
            </div>
          </div>
        </div>
        
        {/* Description Section */}
        <div className="details-section">
          <h2 className="section-title">Description</h2>
          <p className="details-description">
            {animal.description}
            {/* Add more detailed description */}
            {animal.longDescription && <span><br/><br/>{animal.longDescription}</span>}
          </p>
        </div>
        
        {/* Compatibility Section */}
        <div className="details-section">
          <h2 className="section-title">Compatibility</h2>
          <div className="compatibility-grid">
            <div className="compatibility-item">
              <span className="compatibility-label">Children</span>
              <span className="compatibility-value">{animal.childsafe}</span>
            </div>
            <div className="compatibility-item">
              <span className="compatibility-label">Dogs</span>
              <span className="compatibility-value">{animal.dogsafe}</span>
            </div>
            <div className="compatibility-item">
              <span className="compatibility-label">Cats</span>
              <span className="compatibility-value">{animal.catsafe}</span>
            </div>
          </div>
        </div>
        
        {/* Adoption Information Section */}
        <div className="details-section">
          <h2 className="section-title">Adoption Information</h2>
          <p className="details-description">
            <strong>Adoption fee:</strong> $250<br/>
            <strong>Includes:</strong> Spay/neuter, vaccinations, microchip, deworming, and a basic health check.
            <br/><br/>
            All adoptions require an application and home check. This helps us ensure our animals
            go to well-suited homes where they will thrive.
          </p>
        </div>
        
        {/* Navigation buttons for other detail screens */}
        <div className="details-navigation-buttons">
          <button className="details-nav-button" onClick={goToHealth}>
            Health Details
          </button>
          <button className="details-nav-button" onClick={goToBehavior}>
            Behavior Details
          </button>
        </div>
        
        {/* Contact Information */}
        <div className="contact-section">
          <h2 className="section-title">Contact Information</h2>
          <p className="contact-text">
            For more information about {animal.name}, please contact the foster coordinator:
            <br/><br/>
            <strong>Email:</strong> foster@{animal.rescue_group_name.toLowerCase().replace(/\s+/g, '')}.org<br/>
            <strong>Phone:</strong> (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;