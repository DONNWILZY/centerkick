const express = require('express');
const router = express.Router();
const fixturesController = require('../controllers/fixturesController');



// Create a new fixture
router.post('/fixtures', fixturesController.createFixture);

// Get all fixtures
router.get('/fixtures', fixturesController.getAllFixtures);

// Get fixture by ID
router.get('/fixtures/:id', fixturesController.getFixtureById);

// Update fixture by ID
router.put('/fixtures/:id', fixturesController.updateFixtureById);

// Delete fixture by ID
router.delete('/fixtures/:id', fixturesController.deleteFixtureById);

module.exports = router;
