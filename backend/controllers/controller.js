const express = require('express'),
    router = express.Router()

const service = require('../services/service')

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Or specify the origin: 'http://yourdomain.com'
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Specify allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Specify allowed headers
    next();
});

// Get all rescue groups
router.get('/rescue-group', async (req, res) => {
    const mockData = [
        { id: 1, name: "Wine Country Greyhounds", location: "Napa, CA"},
        { id: 2, name: "Blessed Bow Wows", location: "Marietta, GA"},
        { id: 3, name: "Lowcountry Basset Hounds", location: "Charleston, SC"},
    ]
    res.json(mockData);
})

// Get all fosters
router.get('/foster', async (req, res) => {
  
    const animals = await service.getAllFosters(req.query)
    res.send(fosters)
    
    console.log('Received query parameters:', req.query);
    
    const mockData = [
        { id: 1, name: "Fluffy", image: "https://dog.ceo/api/breeds/image/random", age: "Puppy", age_id: 1, breed: "Coon hound", gender: "Female", size: "Medium", description: "Loves to play fetch", energy: "Medium", childsafe: "Good with kids over 2", dogsafe: "No", catsafe: "No", housetrained: "Yes", rescue_group_id: 1, rescue_group_name: "Wine Country Greyhounds" },
        { id: 2, name: "Spot", image: "https://dog.ceo/api/breeds/image/random", age: "Adult", age_id: 2, breed: "Puggle", gender: "Male", size: "Small", description: "Sleeps most of the day", energy: "Low", childsafe: "Good with kids over 2", dogsafe: "No", catsafe: "No", housetrained: "Yes", rescue_group_id: 2, rescue_group_name: "Blessed Bow Wows" },
        { id: 3, name: "Sir Barksalot", image: "https://dog.ceo/api/breeds/image/random", age: "Senior", age_id: 3, breed: "Greyhound", gender: "Female", size: "Large", description: "Runs 100MPH or 0MPH. Not much between.", energy: "Couch potato", childsafe: "Good with kids over 10", dogsafe: "Yes", catsafe: "Yes", housetrained: "Yes", rescue_group_id: 1, rescue_group_name: "Wine Country Greyhounds" },
    ]
    
    // Start with all animals
    let filteredData = [animals, ...mockData];
    
    // Apply filters based on query parameters
    const {
        rescueGroupId,
        species,
        ageId,
        size,
        gender,
        goodWithChildren,
        goodWithDogs,
        goodWithCats, 
        houseTrained,
        specialNeeds
    } = req.query;
    
    // Filter by rescue group
    if (rescueGroupId) {
        filteredData = filteredData.filter(animal => 
            animal.rescue_group_id == rescueGroupId
        );
    }
    
    // Filter by species
    if (species && species !== 'All') {
        filteredData = filteredData.filter(animal => 
            animal.species === species
        );
    }
    
    // Filter by age
    if (ageId && parseInt(ageId) > 0) {
        const ageIdNum = parseInt(ageId);
        console.log(`Filtering by age ID: ${ageIdNum}`);
        
        filteredData = filteredData.filter(animal => {
            const animalAgeId = animal.age_id || 0;
            const animalAge = animal.age ? animal.age.toLowerCase() : '';
            const targetAge = ['puppy', 'adult', 'senior'][ageIdNum - 1];
            
            console.log(`Animal ${animal.name}: ID=${animalAgeId}, Age=${animalAge}, Target=${targetAge}`);
            
            return animalAgeId === ageIdNum || animalAge === targetAge;
        });
        
        console.log(`After age filtering, ${filteredData.length} animals remain`);
    }
    
    // Filter by size
    if (size && size !== 'All') {
        filteredData = filteredData.filter(animal => 
            animal.size === size
        );
    }
    
    // Filter by gender
    if (gender && gender !== 'All') {
        filteredData = filteredData.filter(animal => 
            animal.gender === gender
        );
    }
    
    // Filter by compatibility with children
    if (goodWithChildren === 'true') {
        filteredData = filteredData.filter(animal => 
            animal.childsafe && 
            !animal.childsafe.toLowerCase().includes('not')
        );
    }
    
    // Filter by compatibility with dogs
    if (goodWithDogs === 'true') {
        filteredData = filteredData.filter(animal => 
            animal.dogsafe && 
            animal.dogsafe.toLowerCase() === 'yes'
        );
    }
    
    // Filter by compatibility with cats
    if (goodWithCats === 'true') {
        filteredData = filteredData.filter(animal => 
            animal.catsafe && 
            animal.catsafe.toLowerCase() === 'yes'
        );
    }
    
    // Filter by house training
    if (houseTrained === 'true') {
        filteredData = filteredData.filter(animal => 
            animal.housetrained && 
            animal.housetrained.toLowerCase() === 'yes'
        );
    }
    
    // Filter by special needs
    if (specialNeeds === 'true') {
        filteredData = filteredData.filter(animal => 
            animal.special_needs === true
        );
    }
    
    res.json(filteredData);
})

// Get a specific foster animal by ID
router.get('/foster/:id', async (req, res) => {
    const animalId = parseInt(req.params.id);
    
    const animal = await service.getDogById(animalId);
    if (!animal) {
        return res.status(404).json({ message: 'Animal not found' });
    }
    return res.json(animal);
    
    // Mock data for now
    const mockData = [
        { id: 1, name: "Fluffy", image: "https://dog.ceo/api/breeds/image/random", age: "Puppy", breed: "Coon hound", gender: "Female", size: "Medium", description: "Loves to play fetch", energy: "Medium", childsafe: "Good with kids over 2", dogsafe: "No", catsafe: "No", housetrained: "Yes", rescue_group_id: 1, rescue_group_name: "Wine Country Greyhounds" },
        { id: 2, name: "Spot", image: "https://dog.ceo/api/breeds/image/random", age: "Adult", breed: "Puggle", gender: "Male", size: "Small", description: "Sleeps most of the day", energy: "Low", childsafe: "Good with kids over 2", dogsafe: "No", catsafe: "No", housetrained: "Yes", rescue_group_id: 2, rescue_group_name: "Blessed Bow Wows" },
        { id: 3, name: "Sir Barksalot", image: "https://dog.ceo/api/breeds/image/random", age: "Senior", breed: "Greyhound", gender: "Female", size: "Large", description: "Runs 100MPH or 0MPH. Not much between.", energy: "Couch potato", childsafe: "Good with kids over 10", dogsafe: "Yes", catsafe: "Yes", housetrained: "Yes", rescue_group_id: 1, rescue_group_name: "Wine Country Greyhounds" },
    ];
    
    if(!animal){
      const animal = mockData.find(animal => animal.id === animalId);
    }
    
    if (!animal) {
        return res.status(404).json({ message: 'Animal not found' });
    }
    
    res.json(animal);
})

// Get health information for a specific animal
router.get('/foster/:id/health', async (req, res) => {
    const animalId = parseInt(req.params.id);
    
    /* When database is ready, use this:
    const healthData = await service.getAnimalHealth(animalId);
    if (!healthData) {
        return res.status(404).json({ message: 'Health information not found' });
    }
    return res.json(healthData);
    */
    
    // Mock health data for different animals
    const mockHealthData = {
        1: {
            spayed_neutered: true,
            vaccinated: true,
            microchipped: true,
            special_needs: false,
            medical_notes: 'Fluffy is in excellent health with no known medical conditions.',
            dietary_needs: 'Standard puppy food, three times daily.',
            exercise_needs: 'Regular play and short walks appropriate for a growing puppy.',
            grooming_needs: 'Weekly brushing, occasional bath as needed.',
            last_vet_visit: '2025-03-10',
            conditions: [],
            medications: []
        },
        2: {
            spayed_neutered: true,
            vaccinated: true,
            microchipped: true,
            special_needs: false,
            medical_notes: 'Spot is in good health with no major concerns.',
            dietary_needs: 'Standard adult dog food, twice daily.',
            exercise_needs: 'Short daily walks are sufficient for his energy level.',
            grooming_needs: 'Minimal grooming needed, occasional nail trim.',
            last_vet_visit: '2025-02-15',
            conditions: [],
            medications: []
        },
        3: {
            spayed_neutered: true,
            vaccinated: true,
            microchipped: true,
            special_needs: true,
            medical_notes: 'Sir Barksalot has mild arthritis in his hind legs, managed with supplements.',
            dietary_needs: 'Senior formula food with joint supplements.',
            exercise_needs: 'Short, gentle walks; avoid excessive exercise.',
            grooming_needs: 'Regular brushing to maintain coat health.',
            last_vet_visit: '2025-03-05',
            conditions: [
                { name: 'Arthritis', description: 'Mild arthritis in hind legs, managed with supplements.' }
            ],
            medications: [
                { name: 'Joint supplement', dosage: '1 tablet', frequency: 'Daily with food' }
            ]
        }
    };
    
    const healthData = mockHealthData[animalId];
    
    if (!healthData) {
        return res.status(404).json({ message: 'Health information not found' });
    }
    
    res.json(healthData);
})

// Get behavior information for a specific animal
router.get('/foster/:id/behavior', async (req, res) => {
    const animalId = parseInt(req.params.id);
    
    /* When database is ready, use this:
    const behaviorData = await service.getAnimalBehavior(animalId);
    if (!behaviorData) {
        return res.status(404).json({ message: 'Behavior information not found' });
    }
    return res.json(behaviorData);
    */
    
    // Mock behavior data for different animals
    const mockBehaviorData = {
        1: {
            energy_level: 'High',
            affection_level: 'Very Affectionate',
            sociability: 'Friendly',
            independence: 'Moderate',
            obedience_level: 'Basic training',
            known_commands: 'Sit, Come (when not distracted)',
            behavioral_notes: 'Fluffy is a typical playful puppy still learning manners. Has occasional accidents indoors and can get mouthy during play.',
            ideal_home: 'Active family with time for training and exercise. Fenced yard preferred.'
        },
        2: {
            energy_level: 'Low',
            affection_level: 'Affectionate',
            sociability: 'Reserved',
            independence: 'High',
            obedience_level: 'Well-trained',
            known_commands: 'Sit, Stay, Come, Down',
            behavioral_notes: 'Spot is calm and quiet, preferring to lounge most of the day. Gets along well with people but can be shy with strangers.',
            ideal_home: 'Quiet household with a relaxed atmosphere. Good for apartment living.'
        },
        3: {
            energy_level: 'Low to Medium',
            affection_level: 'Very Affectionate',
            sociability: 'Friendly',
            independence: 'Moderate',
            obedience_level: 'Well-trained',
            known_commands: 'Sit, Stay, Come, Down, Leave it',
            behavioral_notes: 'Sir Barksalot is a retired racing greyhound with excellent manners. Generally calm but enjoys short bursts of energy. Very gentle with people.',
            ideal_home: 'Home with comfortable sleeping spots and short daily walks. Gets along well with respectful children and other calm pets.'
        }
    };
    
    const behaviorData = mockBehaviorData[animalId];
    
    if (!behaviorData) {
        return res.status(404).json({ message: 'Behavior information not found' });
    }
    
    res.json(behaviorData);
})

// Get all age labels
router.get('/age', async (req, res) => {
    try {
        const ages = await service.getAllAges();
        res.json(ages);
    } catch (err) {
        console.error("Error in /age endpoint:", err);
        res.status(500).json({error: "Internal server error"});
    }
})

// Get all childsafe labels
router.get('/childsafe', async (req, res) => {
    try {
        const childsafes = await service.getAllChildsafes();
        res.json(childsafes);
    } catch (err) {
        console.error("Error in /childsafe endpoint:", err);
        res.status(500).json({error: "Internal server error"});
    }
})

// Get all energy labels
router.get('/energy', async (req, res) => {
    try {
        const energy = await service.getAllEnergy();
        res.json(energy);
    } catch (err) {
        console.error("Error in /energy endpoint:", err);
        res.status(500).json({error: "Internal server error"});
    }
})

// Get all dogsafe labels
router.get('/dogsafe', async (req, res) => {
    try {
        const dogsafe = await service.getAllDogsafes();
        res.json(dogsafe);
    } catch (err) {
        console.error("Error in /dogsafe endpoint:", err);
        res.status(500).json({error: "Internal server error"});
    }
})

// Get all catsafe labels
router.get('/catsafe', async (req, res) => {
    try {
        const catsafes = await service.getAllCatsafes();
        res.json(catsafes);
    } catch (err) {
        console.error("Error in /catsafe endpoint:", err);
        res.status(500).json({error: "Internal server error"});
    }
})

// Get all housetrained labels
router.get('/housetrained', async (req, res) => {
    try {
        const housetrained = await service.getAllHousetrained();
        res.json(housetrained);
    } catch (err) {
        console.error("Error in /housetrained endpoint:", err);
        res.status(500).json({error: "Internal server error"});
    }
})

module.exports = router