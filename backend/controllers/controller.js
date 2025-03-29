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
        { id: 1, name: "Wine Country Greyhounds"},
        { id: 1, name: "Blessed Bow Wows"},
        { id: 1, name: "Lowcountry Basset Hounds"},
    ]
    res.json(mockData);
})

// Get all fosters
router.get('/foster', async (req, res) => {
    /* Add database call later
    const animals = await service.getAllFosters()
    res.send(fosters)
    */
    const mockData = [
        { id: 1, name: "Fluffy", image: "https://dog.ceo/api/breeds/image/random", age: "Puppy", breed: "Coon hound", gender: "Female", size: "Medium", description: "Loves to play fetch", energy: "Medium", childsafe: "Good with kids over 2", dogsafe: "No", catsafe: "No", housetrained: "Yes" },
        { id: 2, name: "Spot", image: "https://dog.ceo/api/breeds/image/random", age: "Adult", breed: "Puggle", gender: "Male", size: "Small", description: "Sleeps most of the day", energy: "Low", childsafe: "Good with kids over 2", dogsafe: "No", catsafe: "No", housetrained: "Yes" },
        { id: 3, name: "Sir Barksalot", image: "https://dog.ceo/api/breeds/image/random", age: "Senior", breed: "Greyhound", gender: "Female", size: "Large", description: "Runs 100MPH or 0MPH. Not much between.", energy: "Couch potato", childsafe: "Good with kids over 10", dogsafe: "Yes", catsafe: "Yes", housetrained: "Yes" },
    ]
    res.json(mockData);
})

// Get all age labels
router.get('/age', async (req, res) => {
    const mockData = [
        {id: 1, label: "Puppy"},
        {id: 2, label: "Adult"},
        {id: 3, label: "Senior"}
    ]
    res.json(mockData);
})

// Get all childsafe labels
router.get('/childsafe', async (req, res) => {
    const mockData = [
        {id: 1, label: "Unknown"},
        {id: 2, label: "Not safe with preteen kids"},
        {id: 3, label: "Safe with kids of all ages"},
        {id: 4, label: "Safe with kids over 2"},
        {id: 5, label: "Safe with kids over 5"},
        {id: 6, label: "Safe with kids over 10"}
    ]
    res.json(mockData);
})

// Get all energy labels
router.get('/energy', async (req, res) => {
    const mockData = [
        {id: 1, label: "Unknown"},
        {id: 2, label: "Couch potato"},
        {id: 3, label: "Energetic every now and again"},
        {id: 4, label: "Needs exercise some days"},
        {id: 5, label: "Needs exercise every day"},
        {id: 6, label: "Fireball"}
    ]
    res.json(mockData);
})

// Get all dogsafe labels
router.get('/dogsafe', async (req, res) => {
    const mockData = [
        {id: 1, label: "Unknown"},
        {id: 2, label: "Best for a one-dog household"},
        {id: 3, label: "Safe with dogs of similar size"},
        {id: 4, label: "Safe with most other dogs"},
        {id: 5, label: "Would do better in a house with other dogs"}
    ]
    res.json(mockData);
})

module.exports = router