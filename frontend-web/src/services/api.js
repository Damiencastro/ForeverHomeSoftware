// api.js
// This file provides mock data for testing the UI components
// It simulates API responses with hardcoded data based on the schema provided

// Sample rescue groups data
const MOCK_RESCUE_GROUPS = [
    {
      id: 1,
      name: 'Paws & Whiskers Rescue',
      location: 'Atlanta, GA',
      phone: '555-123-4567',
      email: 'info@pawswhiskers.org',
      website: 'www.pawswhiskers.org',
    },
    {
      id: 2,
      name: 'Second Chance Animal Rescue',
      location: 'Marietta, GA',
      phone: '555-987-6543',
      email: 'adopt@secondchance.org',
      website: 'www.secondchance.org',
    },
    {
      id: 3,
      name: 'Forever Friends Shelter',
      location: 'Kennesaw, GA',
      phone: '555-456-7890',
      email: 'contact@foreverfriends.org',
      website: 'www.foreverfriends.org',
    }
  ];
  
  // Sample animals data based on provided schema
  const MOCK_ANIMALS = [
    {
      id: 1,
      name: 'Buddy',
      age_id: 2,
      age: 'adult',
      breed: 'Golden Retriever',
      gender: 'Male',
      size: 'Large',
      description: 'Buddy is a friendly, energetic dog who loves to play fetch and go for long walks.',
      energy_id: 3,
      energy: 'High',
      childsafe_id: 2,
      childsafe: 'Good with children over 8',
      dogsafe_id: 1,
      dogsafe: 'Great with other dogs',
      catsafe_id: 3,
      catsafe: 'Not suitable for homes with cats',
      housetrained_id: 1,
      housetrained: 'Fully house trained',
      image: 'https://via.placeholder.com/400x300?text=Buddy',
      rescue_group_id: 1,
      rescue_group_name: 'Paws & Whiskers Rescue'
    },
    {
      id: 2,
      name: 'Luna',
      age_id: 1,
      age: 'puppy',
      breed: 'Border Collie Mix',
      gender: 'Female',
      size: 'Medium',
      description: 'Luna is a playful and intelligent puppy who is eager to learn and please her people.',
      energy_id: 3,
      energy: 'High',
      childsafe_id: 3,
      childsafe: 'Better for families with older children',
      dogsafe_id: 2,
      dogsafe: 'Good with calm, patient dogs',
      catsafe_id: 2,
      catsafe: 'Can live with cat-savvy cats',
      housetrained_id: 2,
      housetrained: 'In progress, occasional accidents',
      image: 'https://via.placeholder.com/400x300?text=Luna',
      rescue_group_id: 1,
      rescue_group_name: 'Paws & Whiskers Rescue'
    },
    {
      id: 3,
      name: 'Max',
      age_id: 3,
      age: 'senior',
      breed: 'Labrador Retriever',
      gender: 'Male',
      size: 'Large',
      description: 'Max is a sweet, laid-back senior who enjoys leisurely walks and plenty of naps.',
      energy_id: 1,
      energy: 'Low',
      childsafe_id: 1,
      childsafe: 'Great with children of all ages',
      dogsafe_id: 1,
      dogsafe: 'Great with other dogs',
      catsafe_id: 1,
      catsafe: 'Great with cats',
      housetrained_id: 1,
      housetrained: 'Fully house trained',
      image: 'https://via.placeholder.com/400x300?text=Max',
      rescue_group_id: 2,
      rescue_group_name: 'Second Chance Animal Rescue'
    },
    {
      id: 4,
      name: 'Daisy',
      age_id: 2,
      age: 'adult',
      breed: 'Pitbull Mix',
      gender: 'Female',
      size: 'Medium',
      description: 'Daisy is an affectionate and loyal companion who loves people and belly rubs.',
      energy_id: 2,
      energy: 'Medium',
      childsafe_id: 2,
      childsafe: 'Good with children over 8',
      dogsafe_id: 3,
      dogsafe: 'Prefers to be the only dog',
      catsafe_id: 3,
      catsafe: 'Not suitable for homes with cats',
      housetrained_id: 1,
      housetrained: 'Fully house trained',
      image: 'https://via.placeholder.com/400x300?text=Daisy',
      rescue_group_id: 2,
      rescue_group_name: 'Second Chance Animal Rescue'
    },
    {
      id: 5,
      name: 'Charlie',
      age_id: 1,
      age: 'puppy',
      breed: 'Beagle',
      gender: 'Male',
      size: 'Small',
      description: 'Charlie is a curious and playful puppy who loves to explore and follow his nose.',
      energy_id: 3,
      energy: 'High',
      childsafe_id: 2,
      childsafe: 'Good with children over 8',
      dogsafe_id: 1,
      dogsafe: 'Great with other dogs',
      catsafe_id: 2,
      catsafe: 'Can live with cat-savvy cats',
      housetrained_id: 3,
      housetrained: 'Still learning, needs consistent schedule',
      image: 'https://via.placeholder.com/400x300?text=Charlie',
      rescue_group_id: 3,
      rescue_group_name: 'Forever Friends Shelter'
    }
  ];
  
  // Mock animal health details
  const MOCK_HEALTH_DATA = {
    1: { // Buddy
      spayed_neutered: true,
      vaccinated: true,
      microchipped: true,
      special_needs: false,
      medical_notes: 'Buddy is in excellent health with no known medical conditions.',
      dietary_needs: 'Standard adult dog food, twice daily.',
      exercise_needs: 'Requires daily walks and active play sessions.',
      grooming_needs: 'Regular brushing to manage shedding.',
      last_vet_visit: '2025-02-15',
      conditions: [],
      medications: []
    },
    2: { // Luna
      spayed_neutered: true,
      vaccinated: true,
      microchipped: true,
      special_needs: false,
      medical_notes: 'Luna is healthy and growing well. Still completing puppy vaccination series.',
      dietary_needs: 'High-quality puppy food, three times daily.',
      exercise_needs: 'Short play sessions throughout the day, avoiding long walks until fully vaccinated.',
      grooming_needs: 'Weekly brushing to get used to grooming routine.',
      last_vet_visit: '2025-03-01',
      conditions: [],
      medications: []
    },
    3: { // Max
      spayed_neutered: true,
      vaccinated: true,
      microchipped: true,
      special_needs: true,
      medical_notes: 'Max has mild arthritis in his hips, managed with medication and supplements.',
      dietary_needs: 'Senior formula dog food, joint health supplements.',
      exercise_needs: 'Gentle, short walks. Avoid high-impact activities.',
      grooming_needs: 'Regular brushing, may need assistance with grooming as he ages.',
      last_vet_visit: '2025-02-28',
      conditions: [
        { id: 1, name: 'Arthritis', description: 'Mild arthritis in hips, managed with medication.' }
      ],
      medications: [
        { id: 1, name: 'Glucosamine supplements', dosage: '1 tablet', frequency: 'Daily with food' }
      ]
    },
    4: { // Daisy
      spayed_neutered: true,
      vaccinated: true,
      microchipped: true,
      special_needs: false,
      medical_notes: 'Daisy is in good health with no major concerns.',
      dietary_needs: 'Standard adult dog food, twice daily.',
      exercise_needs: 'Regular walks and play time to maintain healthy weight.',
      grooming_needs: 'Minimal grooming needs, occasional bath and nail trim.',
      last_vet_visit: '2025-01-20',
      conditions: [],
      medications: []
    },
    5: { // Charlie
      spayed_neutered: true,
      vaccinated: true,
      microchipped: true,
      special_needs: false,
      medical_notes: 'Charlie is completing his puppy vaccination series and is in good health.',
      dietary_needs: 'High-quality puppy food, three times daily.',
      exercise_needs: 'Multiple short play sessions throughout the day.',
      grooming_needs: 'Weekly brushing, getting accustomed to having paws and ears handled.',
      last_vet_visit: '2025-03-10',
      conditions: [],
      medications: []
    }
  };
  
  // Mock animal behavior details
  const MOCK_BEHAVIOR_DATA = {
    1: { // Buddy
      energy_level: 'Medium-High',
      affection_level: 'Very Affectionate',
      sociability: 'Very Friendly',
      independence: 'Moderate',
      obedience_level: 'Well-trained',
      known_commands: 'Sit, Stay, Come, Down, Shake',
      behavioral_notes: 'Buddy is well-socialized and eager to please. He walks well on leash with occasional pulling when excited.',
      ideal_home: 'Active family with a yard. Would do well with children and other dogs.'
    },
    2: { // Luna
      energy_level: 'High',
      affection_level: 'Affectionate',
      sociability: 'Friendly',
      independence: 'Low',
      obedience_level: 'Basic training',
      known_commands: 'Sit, Come (when not distracted)',
      behavioral_notes: 'Luna is still learning manners and needs consistent training. She has typical puppy behaviors like chewing and occasional jumping.',
      ideal_home: 'Active family with experience raising puppies. Needs homes with time for training and exercise.'
    },
    3: { // Max
      energy_level: 'Low',
      affection_level: 'Very Affectionate',
      sociability: 'Friendly',
      independence: 'Moderate',
      obedience_level: 'Well-trained',
      known_commands: 'Sit, Stay, Come, Down, Leave it',
      behavioral_notes: 'Max is calm and well-mannered. He enjoys short walks and lots of nap time. Gets along well with everyone.',
      ideal_home: 'Calm household where he can enjoy his golden years. Good with other calm pets and respectful children.'
    },
    4: { // Daisy
      energy_level: 'Medium',
      affection_level: 'Very Affectionate',
      sociability: 'Selective',
      independence: 'Moderate',
      obedience_level: 'Well-trained',
      known_commands: 'Sit, Stay, Come, Down',
      behavioral_notes: 'Daisy is loving with her family but can be reserved with strangers initially. Warms up quickly with proper introduction.',
      ideal_home: 'Home where she can be the only dog. Does best with a confident owner who understands her needs.'
    },
    5: { // Charlie
      energy_level: 'High',
      affection_level: 'Affectionate',
      sociability: 'Very Friendly',
      independence: 'Low',
      obedience_level: 'Basic training',
      known_commands: 'Sit, Name recognition',
      behavioral_notes: 'Charlie is a typical beagle puppy - curious, food-motivated, and has a strong nose drive. Needs consistent training for recall.',
      ideal_home: 'Active family who understands beagle traits and will continue training. Securely fenced yard recommended.'
    }
  };
  
  // Mock lookup tables
  const MOCK_LOOKUP_TABLES = {
    age: [
      { id: 1, label: 'puppy' },
      { id: 2, label: 'adult' },
      { id: 3, label: 'senior' }
    ],
    childsafe: [
      { id: 1, label: 'Great with children of all ages' },
      { id: 2, label: 'Good with children over 8' },
      { id: 3, label: 'Better for families with older children' },
      { id: 4, label: 'Not recommended for homes with children' }
    ],
    energy: [
      { id: 1, label: 'Low' },
      { id: 2, label: 'Medium' },
      { id: 3, label: 'High' }
    ],
    dogsafe: [
      { id: 1, label: 'Great with other dogs' },
      { id: 2, label: 'Good with calm, patient dogs' },
      { id: 3, label: 'Prefers to be the only dog' },
      { id: 4, label: 'Not suitable for homes with other dogs' }
    ],
    catsafe: [
      { id: 1, label: 'Great with cats' },
      { id: 2, label: 'Can live with cat-savvy cats' },
      { id: 3, label: 'Not suitable for homes with cats' }
    ],
    housetrained: [
      { id: 1, label: 'Fully house trained' },
      { id: 2, label: 'In progress, occasional accidents' },
      { id: 3, label: 'Still learning, needs consistent schedule' },
      { id: 4, label: 'Not house trained' }
    ]
  };
  
  // Function to fetch rescue groups
  export const fetchRescueGroups = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_RESCUE_GROUPS;
  };
  
  // Function to fetch animals for a specific rescue group
  export const fetchAnimals = async (rescueGroupId, filters = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter animals by rescue group ID
    let filteredAnimals = MOCK_ANIMALS.filter(animal => 
      animal.rescue_group_id === parseInt(rescueGroupId)
    );
    
    // Apply additional filters
    if (filters.species && filters.species !== 'All') {
      filteredAnimals = filteredAnimals.filter(animal => 
        animal.species === filters.species
      );
    }
    
    if (filters.age && filters.age !== 'All') {
      filteredAnimals = filteredAnimals.filter(animal => 
        animal.age === filters.age
      );
    }
    
    if (filters.size && filters.size !== 'All') {
      filteredAnimals = filteredAnimals.filter(animal => 
        animal.size === filters.size
      );
    }
    
    if (filters.gender && filters.gender !== 'All') {
      filteredAnimals = filteredAnimals.filter(animal => 
        animal.gender === filters.gender
      );
    }
    
    // Boolean filters
    if (filters.goodWithChildren) {
      filteredAnimals = filteredAnimals.filter(animal => 
        animal.childsafe_id <= 2 // Great with children or good with older children
      );
    }
    
    if (filters.goodWithDogs) {
      filteredAnimals = filteredAnimals.filter(animal => 
        animal.dogsafe_id <= 2 // Great with other dogs or good with calm dogs
      );
    }
    
    if (filters.goodWithCats) {
      filteredAnimals = filteredAnimals.filter(animal => 
        animal.catsafe_id <= 2 // Great with cats or can live with cat-savvy cats
      );
    }
    
    if (filters.houseTrained) {
      filteredAnimals = filteredAnimals.filter(animal => 
        animal.housetrained_id === 1 // Fully house trained
      );
    }
    
    return filteredAnimals;
  };
  
  // Function to fetch a single animal by ID
  export const fetchAnimalById = async (animalId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const animal = MOCK_ANIMALS.find(animal => animal.id === parseInt(animalId));
    if (!animal) {
      throw new Error('Animal not found');
    }
    
    return animal;
  };
  
  // Function to fetch health information for an animal
  export const fetchAnimalHealth = async (animalId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const healthData = MOCK_HEALTH_DATA[animalId];
    if (!healthData) {
      throw new Error('Health information not found');
    }
    
    return healthData;
  };
  
  // Function to fetch behavior information for an animal
  export const fetchAnimalBehavior = async (animalId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const behaviorData = MOCK_BEHAVIOR_DATA[animalId];
    if (!behaviorData) {
      throw new Error('Behavior information not found');
    }
    
    return behaviorData;
  };
  
  // Function to fetch lookup table data
  export const fetchLookupTable = async (tableName) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const tableData = MOCK_LOOKUP_TABLES[tableName];
    if (!tableData) {
      throw new Error(`Lookup table ${tableName} not found`);
    }
    
    return tableData;
  };
  
  // For testing/development, expose the mock data directly
  export const MockData = {
    rescueGroups: MOCK_RESCUE_GROUPS,
    animals: MOCK_ANIMALS,
    healthData: MOCK_HEALTH_DATA,
    behaviorData: MOCK_BEHAVIOR_DATA,
    lookupTables: MOCK_LOOKUP_TABLES
  };