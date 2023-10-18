const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserContollers');
// Import the updateAthlete function from your controller
const { updateAthlete, getAthleteProfile} = require('../controllers/athleteControllers');

// Create a new user
router.post('/users', UserController.createUser);

// Get all users
router.get('/users', UserController.getAllUsers);

// Get a specific user by ID
router.get('/users/:id', UserController.getUserById);

// Update a specific user by ID
router.put('/users/:id', UserController.updateUser);

// Delete a specific user by ID
router.delete('/users/:id', UserController.deleteUser);

// update ATHLET PROFILE
router.put('/update/:userId', updateAthlete);
router.get('/athlete/:userId', getAthleteProfile);



module.exports = router;
