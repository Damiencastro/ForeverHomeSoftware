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
router.get('/rescue-groups', async (req, res) => {
    const mockData = [
        { id: 1, name: "Wine Country Greyhounds"},
        { id: 1, name: "Blessed Bow Wows"},
        { id: 1, name: "Lowcountry Basset Hounds"},
    ]
    res.json(mockData);
})

// Get all fosters
router.get('/fosters', async (req, res) => {
    /* Add database call later
    const animals = await service.getAllFosters()
    res.send(fosters)
    */
    const mockData = [
        { id: 1, name: "Fluffy", image: "https://dog.ceo/api/breeds/image/random", age: "Puppy", breed: "Coon hound", gender: "Female", size: "Medium", description: "Loves to play fetch", energy: "Medium", childsafe: "Good with kids over 2", dogsafe: "No", catsafe: "No", housetrained: "Yes" },
        { id: 2, name: "Spot", image: "https://dog.ceo/api/breeds/image/random", age: "Adult", breed: "Puggle", gender: "Male", size: "Small", description: "Sleeps most of the day", energy: "Low", childsafe: "Good with kids over 2", dogsafe: "No", catsafe: "No", housetrained: "Yes" },
        { id: 3, name: "Fluffy", image: "https://dog.ceo/api/breeds/image/random", age: "Senior", breed: "Greyhound", gender: "Female", size: "Large", description: "Runs 100MPH or 0MPH. Not much between.", energy: "Couch potato", childsafe: "Good with kids over 10", dogsafe: "Yes", catsafe: "Yes", housetrained: "Yes" },
    ]
    res.json(mockData);
})


module.exports = router