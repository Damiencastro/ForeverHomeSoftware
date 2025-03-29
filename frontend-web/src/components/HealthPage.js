// HealthPage.js - Web Version
// This component displays health-related information about an animal
// It follows the same layout pattern as the Details page but with different content

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/HealthPage.css';
import AnimalImage from './AnimalImage';

const HealthPage = () => {
  // Get animal ID from URL params
  const { animalId } = useParams();
  const navigate = useNavigate();
  
  // State for animal data and health information
  const [animal, setAnimal] = useState(null);
  const [healthInfo, setHealthInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Get animal from localStorage
        const storedAnimal = localStorage.getItem('currentAnimalDetails');
        let animalData;
        
        if (storedAnimal) {
          animalData = JSON.parse(storedAnimal);
          setAnimal(animalData);
        } else {
          // If not in localStorage, use a placeholder
          animalData = {
            id: parseInt(animalId),
            name: "Unknown Animal",
            breed: "Unknown Breed",
            description: "Details not available."
          };
          setAnimal(animalData);
        }
        
        // Create mock health data based on the animal
        const mockHealthData = {
          spayed_neutered: true,
          vaccinated: true,
          microchipped: true,
          special_needs: false,
          medical_notes: `${animalData.name} is in good health with no known issues.`,
          dietary_needs: `Standard food appropriate for a ${animalData.breed}.`,
          exercise_needs: `Regular exercise appropriate for ${animalData.name}'s age and size.`,
          grooming_needs: 'Regular grooming to maintain coat health.',
          last_vet_visit: '2025-03-15',
          conditions: [],
          medications: []
        };
        
        setHealthInfo(mockHealthData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading health information:', error);
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
  
  const goToBehavior = () => {
    navigate(`/behavior/${animalId}`);
  };
  
  // Display loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading health information...</p>
      </div>
    );
  }
  
  // Display error message if data not found
  if (!animal || !healthInfo) {
    return (
      <div className="error-container">
        <h2>Information Not Found</h2>
        <p>We couldn't find health information for this animal.</p>
        <button onClick={goBack} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="health-container">
      {/* Header with back button and page title */}
      <div className="health-header">
        <button onClick={goBack} className="back-button">
          &larr; Back
        </button>
        <h1 className="health-title">{animal.name}'s Health</h1>
        <div className="spacer"></div> {/* Empty div for spacing */}
      </div>
      
      <div className="health-content">
        {/* Small animal image for reference */}
        <div className="health-image-container">
        <AnimalImage
          animal={animal}
          className="health-animal-image"
        />
        </div>
        
        {/* Medical Status Section */}
        <div className="health-section">
          <h2 className="section-title">Medical Status</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Spayed/Neutered</span>
              <span className="info-value">{healthInfo.spayed_neutered ? 'Yes' : 'No'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Vaccinations</span>
              <span className="info-value">{healthInfo.vaccinated ? 'Up to date' : 'In progress'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Microchipped</span>
              <span className="info-value">{healthInfo.microchipped ? 'Yes' : 'No'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Vet Check</span>
              <span className="info-value">{healthInfo.last_vet_visit || 'Not available'}</span>
            </div>
          </div>
        </div>
        
        {/* Known Medical Conditions Section */}
        <div className="health-section">
          <h2 className="section-title">Known Medical Conditions</h2>
          {healthInfo.conditions && healthInfo.conditions.length > 0 ? (
            <div className="conditions-list">
              {healthInfo.conditions.map((condition, index) => (
                <div key={index} className="condition-item">
                  <h3 className="condition-name">{condition.name}</h3>
                  <p className="condition-description">{condition.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="health-description">
              {animal.name} is in excellent health with no known medical conditions.
              Has been examined by a veterinarian and cleared for adoption.
            </p>
          )}
        </div>
        
        {/* Medications Section (if any) */}
        {healthInfo.medications && healthInfo.medications.length > 0 && (
          <div className="health-section">
            <h2 className="section-title">Current Medications</h2>
            <div className="medications-list">
              {healthInfo.medications.map((medication, index) => (
                <div key={index} className="medication-item">
                  <h3 className="medication-name">{medication.name}</h3>
                  <p className="medication-details">
                    <strong>Dosage:</strong> {medication.dosage}<br/>
                    <strong>Frequency:</strong> {medication.frequency}
                    {medication.notes && <><br/><strong>Notes:</strong> {medication.notes}</>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Dietary Needs Section */}
        <div className="health-section">
          <h2 className="section-title">Dietary Needs</h2>
          <p className="health-description">
            {healthInfo.dietary_needs || 
              `Currently eating high-quality dry kibble twice daily. 
              Has no known food allergies or special dietary requirements.
              Treats should be given in moderation to maintain healthy weight.`
            }
          </p>
        </div>
        
        {/* Exercise Requirements Section */}
        <div className="health-section">
          <h2 className="section-title">Exercise Requirements</h2>
          <p className="health-description">
            {healthInfo.exercise_needs || 
              `${animal.name} requires moderate daily exercise to maintain physical and mental health.
              Recommended: 30-45 minutes of walking or active play per day, divided into two sessions.
              Enjoys fetch games and interactive toys.`
            }
          </p>
        </div>
        
        {/* Grooming Needs Section */}
        <div className="health-section">
          <h2 className="section-title">Grooming Needs</h2>
          <p className="health-description">
            {healthInfo.grooming_needs || 
              `Coat requires brushing 2-3 times per week to reduce shedding and maintain coat health.
              Should have nails trimmed every 3-4 weeks.
              Bathing recommended once every 2-3 months or as needed.`
            }
          </p>
        </div>
        
        {/* Navigation buttons for other detail screens */}
        <div className="health-navigation-buttons">
          <button className="health-nav-button" onClick={goToDetails}>
            Basic Details
          </button>
          <button className="health-nav-button" onClick={goToBehavior}>
            Behavior Details
          </button>
        </div>
        
        {/* Veterinary Care Recommendations */}
        <div className="vet-section">
          <h2 className="section-title">Veterinary Care Recommendation</h2>
          <p className="vet-text">
            We recommend scheduling a veterinary appointment within 2 weeks of adoption
            to establish care and ensure a smooth transition for your new companion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthPage;