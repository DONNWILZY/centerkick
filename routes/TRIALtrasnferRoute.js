const express = require('express');
const router = express.Router();
const transferController = require('../controllers/trialTransferControllers');

// Create a new transfer
router.post('/create', transferController.createTransfer);

// Update a transfer by ID
router.put('/update/:id', transferController.updateTransferById);

// Delete a transfer by ID
router.delete('/delete/:id', transferController.deleteTransferById);

// Get a single transfer by ID
router.get('/transfers/:id', transferController.getTransferById);

// Get all transfers
router.get('/transfers', transferController.getAllTransfers);

module.exports = router;
