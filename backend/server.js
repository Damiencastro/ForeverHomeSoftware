// backend/server.js
// This is the main entry point for the Express server
// It sets up routes and starts the server

const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const { Pool } = require('pg'); 
require('dotenv').config(); 

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connection successful');
  }
});

// API Routes

// Get all rescue groups
app.get('/api/rescue-groups', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rescue_groups ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching rescue groups:', err);
    res.status(500).json({ error: 'An error occurred while fetching rescue groups' });
  }
});

// Get animals for a specific rescue group
app.get('/api/rescue-groups/:id/animals', async (req, res) => {
  const rescueGroupId = req.params.id;
  
  try {
    // Start with base query
    let query = `
      SELECT a.*, rg.name as rescue_group_name 
      FROM animals a
      JOIN rescue_groups rg ON a.rescue_group_id = rg.id
      WHERE a.rescue_group_id = $1 AND a.active = true
    `;
    
    const queryParams = [rescueGroupId];
    let paramCount = 1;
    
    // Add filter conditions based on query parameters
    if (req.query.species && req.query.species !== 'All') {
      paramCount++;
      query += ` AND a.species = $${paramCount}`;
      queryParams.push(req.query.species);
    }
    
    if (req.query.size && req.query.size !== 'All') {
      paramCount++;
      query += ` AND a.size = $${paramCount}`;
      queryParams.push(req.query.size);
    }
    
    if (req.query.gender && req.query.gender !== 'All') {
      paramCount++;
      query += ` AND a.gender = $${paramCount}`;
      queryParams.push(req.query.gender);
    }
    
    // Boolean filters
    if (req.query.goodWithChildren === 'true') {
      query += ` AND a.good_with_children = true`;
    }
    
    if (req.query.goodWithDogs === 'true') {
      query += ` AND a.good_with_dogs = true`;
    }
    
    if (req.query.goodWithCats === 'true') {
      query += ` AND a.good_with_cats = true`;
    }
    
    if (req.query.houseTrained === 'true') {
      query += ` AND a.house_trained = true`;
    }
    
    if (req.query.specialNeeds === 'true') {
      paramCount++;
      query += ` AND EXISTS (
        SELECT 1 FROM animal_health ah 
        WHERE ah.animal_id = a.id AND ah.special_needs = true
      )`;
    }
    
    // Age range filters
    if (req.query.ageMin) {
      // This is simplified - in reality, you'd need a more complex age calculation
      paramCount++;
      query += ` AND a.age::text >= $${paramCount}::text`;
      queryParams.push(req.query.ageMin);
    }
    
    if (req.query.ageMax) {
      // This is simplified - in reality, you'd need a more complex age calculation
      paramCount++;
      query += ` AND a.age::text <= $${paramCount}::text`;
      queryParams.push(req.query.ageMax);
    }
    
    // Order by name
    query += ` ORDER BY a.name`;
    
    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (err) {
    console.error(`Error fetching animals for rescue group ${rescueGroupId}:`, err);
    res.status(500).json({ error: 'An error occurred while fetching animals' });
  }
});

// Get a specific animal by ID
app.get('/api/animals/:id', async (req, res) => {
  const animalId = req.params.id;
  
  try {
    const query = `
      SELECT a.*, rg.name as rescue_group_name,
             af.foster_name, af.foster_email, af.foster_phone
      FROM animals a
      JOIN rescue_groups rg ON a.rescue_group_id = rg.id
      LEFT JOIN animal_foster af ON a.id = af.animal_id
      WHERE a.id = $1
    `;
    
    const result = await pool.query(query, [animalId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error fetching animal ${animalId}:`, err);
    res.status(500).json({ error: 'An error occurred while fetching the animal' });
  }
});

// Get health information for a specific animal
app.get('/api/animals/:id/health', async (req, res) => {
  const animalId = req.params.id;
  
  try {
    const query = `
      SELECT ah.*, 
             mc.id as condition_id, mc.condition_name, mc.description as condition_description,
             m.id as medication_id, m.medication_name, m.dosage, m.frequency, m.notes as medication_notes
      FROM animal_health ah
      LEFT JOIN medical_conditions mc ON ah.animal_id = mc.animal_id
      LEFT JOIN medications m ON ah.animal_id = m.animal_id
      WHERE ah.animal_id = $1
    `;
    
    const result = await pool.query(query, [animalId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Health information not found' });
    }
    
    // Process the result to structure the data properly
    const healthInfo = {
      ...result.rows[0],
      conditions: [],
      medications: []
    };
    
    // Remove redundant fields that are now in the conditions and medications arrays
    delete healthInfo.condition_id;
    delete healthInfo.condition_name;
    delete healthInfo.condition_description;
    delete healthInfo.medication_id;
    delete healthInfo.medication_name;
    delete healthInfo.dosage;
    delete healthInfo.frequency;
    delete healthInfo.medication_notes;
    
    // Populate conditions and medications
    result.rows.forEach(row => {
      if (row.condition_id && !healthInfo.conditions.some(c => c.id === row.condition_id)) {
        healthInfo.conditions.push({
          id: row.condition_id,
          name: row.condition_name,
          description: row.condition_description
        });
      }
      
      if (row.medication_id && !healthInfo.medications.some(m => m.id === row.medication_id)) {
        healthInfo.medications.push({
          id: row.medication_id,
          name: row.medication_name,
          dosage: row.dosage,
          frequency: row.frequency,
          notes: row.medication_notes
        });
      }
    });
    
    res.json(healthInfo);
  } catch (err) {
    console.error(`Error fetching health information for animal ${animalId}:`, err);
    res.status(500).json({ error: 'An error occurred while fetching health information' });
  }
});

// Get behavior information for a specific animal
app.get('/api/animals/:id/behavior', async (req, res) => {
  const animalId = req.params.id;
  
  try {
    const query = `
      SELECT * FROM animal_behavior
      WHERE animal_id = $1
    `;
    
    const result = await pool.query(query, [animalId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Behavior information not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error fetching behavior information for animal ${animalId}:`, err);
    res.status(500).json({ error: 'An error occurred while fetching behavior information' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;