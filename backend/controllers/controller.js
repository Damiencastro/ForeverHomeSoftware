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
    try {
        const groups = await service.getAllGroups();
        res.json(groups);
    } catch (err) {
        console.error("Error in /rescue-group endpoint:", err);
        res.status(500).json({error: "Internal server error"});
    }
})

// Get all fosters
router.get('/foster', async (req, res) => {
    try {
        const fosters = await service.getAllFosters();
        res.json(fosters);
    } catch (err) {
        console.error("Error in /foster endpoint:", err);
        res.status(500).json({error: "Internal server error"});
    }
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