// api.js
// This file provides functions to interact with the backend API

// Define the base URL for API requests
const API_BASE_URL = 'http://localhost:5001'; // Change this to match your backend URL

// Function to handle API responses and errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json();
};

// Function to fetch rescue groups
export const fetchRescueGroups = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/rescue-group`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching rescue groups:', error);
    // Fall back to mock data if needed during development
    return [
      { id: 1, name: "Wine Country Greyhounds", location: "Napa, CA" },
      { id: 2, name: "Blessed Bow Wows", location: "Marietta, GA" },
      { id: 3, name: "Lowcountry Basset Hounds", location: "Charleston, SC" },
    ];
  }
};

// Function to fetch animals for a specific rescue group
export const fetchAnimals = async (rescueGroupId, filters = {}) => {
  try {
    console.log('Filters being sent to API:', filters);
    
    
    const url = `${API_BASE_URL}/foster`;
    console.log('Fetching from URL:', url);
    
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching animals:', error);
    // For development, return an empty array when the API fails
    return [];
  }
};

// Function to fetch a single animal by ID
export const fetchAnimalById = async (animalId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/foster/${animalId}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching animal ${animalId}:`, error);
    // Return null to indicate an error
    return null;
  }
};

// Function to fetch health information for an animal
export const fetchAnimalHealth = async (animalId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/foster/${animalId}/health`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching health data for animal ${animalId}:`, error);
    // Fallback health data
    return {
      spayed_neutered: true,
      vaccinated: true,
      microchipped: true,
      special_needs: false,
      medical_notes: 'Information not available.',
      dietary_needs: 'Standard diet appropriate for the animal\'s age and size.',
      exercise_needs: 'Regular exercise appropriate for the animal\'s age and energy level.',
      grooming_needs: 'Regular grooming to maintain coat health.',
      last_vet_visit: 'Recent',
      conditions: [],
      medications: []
    };
  }
};

// Function to fetch behavior information for an animal
export const fetchAnimalBehavior = async (animalId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/foster/${animalId}/behavior`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching behavior data for animal ${animalId}:`, error);
    // Fallback behavior data
    return {
      energy_level: 'Medium',
      affection_level: 'Affectionate',
      sociability: 'Friendly',
      independence: 'Moderate',
      obedience_level: 'Basic training',
      known_commands: 'Basic commands',
      behavioral_notes: 'Information not available.',
      ideal_home: 'Loving home with owners who can provide appropriate care.'
    };
  }
};

// Function to fetch lookup table data
export const fetchLookupTable = async (tableName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${tableName}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching lookup table ${tableName}:`, error);
    // Define fallback lookup tables for when the API fails
    const fallbackTables = {
      age: [
        { id: 1, label: 'Puppy' },
        { id: 2, label: 'Adult' },
        { id: 3, label: 'Senior' }
      ],
      childsafe: [
        { id: 1, label: 'Unknown' },
        { id: 2, label: 'Not safe with preteen kids' },
        { id: 3, label: 'Safe with kids of all ages' },
        { id: 4, label: 'Safe with kids over 2' },
        { id: 5, label: 'Safe with kids over 5' },
        { id: 6, label: 'Safe with kids over 10' }
      ],
      energy: [
        { id: 1, label: 'Unknown' },
        { id: 2, label: 'Couch potato' },
        { id: 3, label: 'Energetic every now and again' },
        { id: 4, label: 'Needs exercise some days' },
        { id: 5, label: 'Needs exercise every day' },
        { id: 6, label: 'Fireball' }
      ],
      dogsafe: [
        { id: 1, label: 'Unknown' },
        { id: 2, label: 'Best for a one-dog household' },
        { id: 3, label: 'Safe with dogs of similar size' },
        { id: 4, label: 'Safe with most other dogs' },
        { id: 5, label: 'Would do better in a house with other dogs' }
      ],
      catsafe: [
        { id: 1, label: 'Unknown' },
        { id: 2, label: 'No' },
        { id: 3, label: 'Yes' }
      ],
      housetrained: [
        { id: 1, label: 'Unknown' },
        { id: 2, label: 'No' },
        { id: 3, label: 'Yes' },
        { id: 4, label: 'In progress' }
      ]
    };
    
    return fallbackTables[tableName] || [];
  }
};