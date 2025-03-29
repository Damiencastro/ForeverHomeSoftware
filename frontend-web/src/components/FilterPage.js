// FilterPage.js - Web Version
// This component allows users to filter animals by specific characteristics
// Users can select multiple criteria to find animals that match their needs

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLookupTable } from '../services/api';
import '../styles/FilterPage.css';

const FilterPage = () => {
  // Get rescue group from URL params
  const { rescueGroup } = useParams();
  const navigate = useNavigate();
  
  // State for lookup tables
  const [ageOptions, setAgeOptions] = useState([]);
  const [energyOptions, setEnergyOptions] = useState([]);
  const [childSafeOptions, setChildSafeOptions] = useState([]);
  const [dogSafeOptions, setDogSafeOptions] = useState([]);
  const [catSafeOptions, setCatSafeOptions] = useState([]);
  const [houseTrainedOptions, setHouseTrainedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter state
  const [filters, setFilters] = useState({
    species: 'All',
    ageId: 0,
    sizeId: 0,
    gender: 'All',
    goodWithChildren: false,
    goodWithDogs: false,
    goodWithCats: false,
    houseTrained: false,
    specialNeeds: false,
  });
  
  // Load lookup table data
  useEffect(() => {
    const loadLookupTables = async () => {
      try {
        setLoading(true);
        
        const [ages, energy, childSafe, dogSafe, catSafe, houseTrained] = await Promise.all([
          fetchLookupTable('age'),
          fetchLookupTable('energy'),
          fetchLookupTable('childsafe'),
          fetchLookupTable('dogsafe'),
          fetchLookupTable('catsafe'),
          fetchLookupTable('housetrained'),
        ]);
        
        setAgeOptions(ages);
        setEnergyOptions(energy);
        setChildSafeOptions(childSafe);
        setDogSafeOptions(dogSafe);
        setCatSafeOptions(catSafe);
        setHouseTrainedOptions(houseTrained);
        setLoading(false);
      } catch (error) {
        console.error('Error loading lookup tables:', error);
        // Use empty arrays if lookup tables fail to load
        setLoading(false);
      }
    };
    
    loadLookupTables();
  }, []);
  
  // Apply filters and navigate back to home with filtered results
  const applyFilters = (e) => {
    e.preventDefault();
    
    // Construct query params
    const queryParams = new URLSearchParams();
    
    // Add all non-default filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      // Only add parameters that have non-default values
      if (
        (typeof value === 'boolean' && value === true) || 
        (typeof value === 'number' && value > 0) ||
        (typeof value === 'string' && value !== 'All' && value.trim() !== '')
      ) {
        queryParams.append(key, value);
      }
    });
    
    // Navigate to home page with filter query params
    navigate(`/home/${rescueGroup}?${queryParams.toString()}`);
  };
  
  // Reset all filters to default values
  const resetFilters = () => {
    setFilters({
      species: 'All',
      ageId: 0,
      sizeId: 0,
      gender: 'All',
      goodWithChildren: false,
      goodWithDogs: false,
      goodWithCats: false,
      houseTrained: false,
      specialNeeds: false,
    });
  };
  
  // Update a single filter value
  const updateFilter = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };
  
  // Handle change for select inputs
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    updateFilter(name, value);
  };
  
  // Handle change for checkbox inputs
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    updateFilter(name, checked);
  };
  
  // Display loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading filter options...</p>
      </div>
    );
  }

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h1 className="filter-title">Filter Animals</h1>
        <button onClick={resetFilters} className="reset-button">
          Reset
        </button>
      </div>
      
      <form onSubmit={applyFilters} className="filter-form">
        {/* Species Filter */}
        <div className="filter-section">
          <h2 className="section-title">Species</h2>
          <select 
            name="species"
            value={filters.species}
            onChange={handleSelectChange}
            className="filter-select"
          >
            <option value="All">All Species</option>
            <option value="Dog">Dogs</option>
            <option value="Cat">Cats</option>
          </select>
        </div>
        
        {/* Age Filter */}
        <div className="filter-section">
          <h2 className="section-title">Age</h2>
          <select 
            name="ageId"
            value={filters.ageId}
            onChange={handleSelectChange}
            className="filter-select"
          >
            <option value={0}>Any Age</option>
            {ageOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Size Filter */}
        <div className="filter-section">
          <h2 className="section-title">Size</h2>
          <select 
            name="size"
            value={filters.size}
            onChange={handleSelectChange}
            className="filter-select"
          >
            <option value="All">Any Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        
        {/* Gender Filter */}
        <div className="filter-section">
          <h2 className="section-title">Gender</h2>
          <select 
            name="gender"
            value={filters.gender}
            onChange={handleSelectChange}
            className="filter-select"
          >
            <option value="All">Any Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        
        {/* Compatibility Filters */}
        <div className="filter-section">
          <h2 className="section-title">Compatibility</h2>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="goodWithChildren"
                checked={filters.goodWithChildren}
                onChange={handleCheckboxChange}
              />
              <span>Good with children</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="goodWithDogs"
                checked={filters.goodWithDogs}
                onChange={handleCheckboxChange}
              />
              <span>Good with dogs</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="goodWithCats"
                checked={filters.goodWithCats}
                onChange={handleCheckboxChange}
              />
              <span>Good with cats</span>
            </label>
          </div>
        </div>
        
        {/* Training & Care Filters */}
        <div className="filter-section">
          <h2 className="section-title">Training & Care</h2>
          
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="houseTrained"
                checked={filters.houseTrained}
                onChange={handleCheckboxChange}
              />
              <span>House trained</span>
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="specialNeeds"
                checked={filters.specialNeeds}
                onChange={handleCheckboxChange}
              />
              <span>Special needs</span>
            </label>
          </div>
        </div>
        
        {/* Submit and Cancel Buttons */}
        <div className="filter-buttons">
          <button type="submit" className="apply-button">
            Apply Filters
          </button>
          <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterPage;