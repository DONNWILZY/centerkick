const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Create a new team
router.post('/create', teamController.createTeam);

// Delete a team by ID
router.delete('/delete/:id', teamController.deleteTeamById);

// Update a team by ID
router.put('/update/:id', teamController.updateTeamById);

// View all teams
router.get('/teams', teamController.getAllTeams);

// View a single team by ID
router.get('/teams/:id', teamController.getTeamById);

// Add players to a team by ID
router.post('/addplayers/:id/', teamController.addPlayersToTeam);

// Update or remove players in a team by ID
router.put('/updateorreomve/:id', teamController.updateAndRemovePlayersInTeam);

module.exports = router;
