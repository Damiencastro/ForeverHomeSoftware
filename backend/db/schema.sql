-- Database schema for Forever Home Software
-- This contains the SQL schema for creating the database tables

-- Create rescue_groups table
CREATE TABLE rescue_groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  website VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create animals table
CREATE TABLE animals (
  id SERIAL PRIMARY KEY,
  rescue_group_id INTEGER REFERENCES rescue_groups(id),
  name VARCHAR(50) NOT NULL,
  species VARCHAR(20) NOT NULL,
  breed VARCHAR(50),
  age VARCHAR(20),
  gender VARCHAR(10),
  size VARCHAR(10),
  color VARCHAR(30),
  coat_length VARCHAR(20),
  image_url VARCHAR(255),
  description TEXT,
  -- Compatibility
  good_with_children BOOLEAN DEFAULT FALSE,
  good_with_dogs BOOLEAN DEFAULT FALSE,
  good_with_cats BOOLEAN DEFAULT FALSE,
  good_with_seniors BOOLEAN DEFAULT FALSE,
  -- Training
  house_trained BOOLEAN DEFAULT FALSE,
  crate_trained BOOLEAN DEFAULT FALSE,
  leash_trained BOOLEAN DEFAULT FALSE,
  -- Adoption info
  adoption_fee DECIMAL(10, 2),
  -- System
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active BOOLEAN DEFAULT TRUE
);

-- Create animal_health table
CREATE TABLE animal_health (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id),
  spayed_neutered BOOLEAN DEFAULT FALSE,
  vaccinated BOOLEAN DEFAULT FALSE,
  microchipped BOOLEAN DEFAULT FALSE,
  special_needs BOOLEAN DEFAULT FALSE,
  medical_notes TEXT,
  dietary_needs TEXT,
  exercise_needs TEXT,
  grooming_needs TEXT,
  last_vet_visit DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create animal_behavior table
CREATE TABLE animal_behavior (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id),
  energy_level VARCHAR(20),
  affection_level VARCHAR(20),
  sociability VARCHAR(20),
  independence VARCHAR(20),
  obedience_level VARCHAR(20),
  known_commands TEXT,
  behavioral_notes TEXT,
  ideal_home TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create medical_conditions table
CREATE TABLE medical_conditions (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id),
  condition_name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create medications table
CREATE TABLE medications (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id),
  medication_name VARCHAR(100) NOT NULL,
  dosage VARCHAR(50),
  frequency VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create foster_coordinators table
CREATE TABLE foster_coordinators (
  id SERIAL PRIMARY KEY,
  rescue_group_id INTEGER REFERENCES rescue_groups(id),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create animal_foster table for tracking which animals are with which foster homes
CREATE TABLE animal_foster (
  id SERIAL PRIMARY KEY,
  animal_id INTEGER REFERENCES animals(id),
  foster_name VARCHAR(100) NOT NULL,
  foster_email VARCHAR(100),
  foster_phone VARCHAR(20),
  start_date DATE,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for testing

-- Sample rescue groups
INSERT INTO rescue_groups (name, location, phone, email, website)
VALUES 
  ('Paws & Whiskers Rescue', 'Atlanta, GA', '555-123-4567', 'info@pawswhiskers.org', 'www.pawswhiskers.org'),
  ('Second Chance Animal Rescue', 'Marietta, GA', '555-987-6543', 'adopt@secondchance.org', 'www.secondchance.org'),
  ('Forever Friends Shelter', 'Kennesaw, GA', '555-456-7890', 'contact@foreverfriends.org', 'www.foreverfriends.org');

-- Sample animals
INSERT INTO animals (
  rescue_group_id, name, species, breed, age, gender, size, color, 
  description, good_with_children, good_with_dogs, good_with_cats, house_trained
)
VALUES 
  (1, 'Buddy', 'Dog', 'Golden Retriever', '3 years', 'Male', 'L', 'Golden', 
   'Buddy is a friendly, energetic dog who loves to play fetch and go for long walks.', true, true, false, true),
  (1, 'Whiskers', 'Cat', 'Domestic Shorthair', '2 years', 'Female', 'M', 'Tabby', 
   'Whiskers is a calm, affectionate cat who enjoys lounging in sunny spots and being petted.', true, false, true, true),
  (2, 'Max', 'Dog', 'Border Collie Mix', '1 year', 'Male', 'M', 'Black/White', 
   'Max is a high-energy, intelligent pup who needs mental stimulation and plenty of exercise.', true, true, true, false),
  (2, 'Luna', 'Cat', 'Siamese', '5 years', 'Female', 'S', 'Cream/Brown', 
   'Luna is a sweet, talkative cat who loves attention and being the queen of her domain.', true, false, false, true),
  (3, 'Rocky', 'Dog', 'Pit Bull Terrier', '4 years', 'Male', 'L', 'Brindle', 
   'Rocky is a gentle giant with a heart of gold. He loves cuddles and is great with people of all ages.', true, false, false, true);

-- Sample health data
INSERT INTO animal_health (
  animal_id, spayed_neutered, vaccinated, microchipped, special_needs, 
  dietary_needs, exercise_needs, grooming_needs
)
VALUES
  (1, true, true, true, false, 
   'Standard dry kibble twice daily', 'Daily walks, fetch games', 'Brushing 2-3 times per week'),
  (2, true, true, true, false, 
   'Wet and dry cat food', 'Indoor play with toys', 'Occasional brushing'),
  (3, true, true, true, false, 
   'High-protein dog food', 'Needs at least 1 hour of exercise daily', 'Weekly brushing'),
  (4, true, true, true, false, 
   'Weight management cat food', 'Interactive toys', 'Regular brushing'),
  (5, true, true, true, false, 
   'Standard dry kibble', 'Moderate exercise, short walks', 'Minimal grooming');

-- Sample behavior data
INSERT INTO animal_behavior (
  animal_id, energy_level, affection_level, sociability, independence, 
  known_commands, behavioral_notes, ideal_home
)
VALUES
  (1, 'Medium-High', 'High', 'Very Friendly', 'Moderate', 
   'Sit, Stay, Come, Fetch', 'Well-socialized, eager to please', 'Active family with yard'),
  (2, 'Low-Medium', 'Medium', 'Selective', 'High', 
   'None', 'Independent but affectionate on her terms', 'Quiet home with sunny spots'),
  (3, 'High', 'Medium', 'Friendly', 'Low', 
   'Sit, Down', 'Needs mental stimulation and structure', 'Active home with experienced dog owners'),
  (4, 'Low', 'High', 'Reserved', 'Medium', 
   'None', 'Bonds closely with one person', 'Quiet home with patient owner'),
  (5, 'Medium', 'High', 'Very Friendly', 'Low', 
   'Sit, Stay, Paw', 'Gentle and loving disposition', 'Any loving home with time for cuddles');

-- Sample foster information
INSERT INTO animal_foster (
  animal_id, foster_name, foster_email, foster_phone, start_date
)
VALUES
  (1, 'Sarah Johnson', 'sarah@email.com', '555-111-2222', '2025-01-15'),
  (2, 'Mike Wilson', 'mike@email.com', '555-222-3333', '2025-02-01'),
  (3, 'Jennifer Smith', 'jennifer@email.com', '555-333-4444', '2025-01-05'),
  (4, 'David Brown', 'david@email.com', '555-444-5555', '2024-12-20'),
  (5, 'Lisa Williams', 'lisa@email.com', '555-555-6666', '2025-02-10');