const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');
const { validateDestination } = require('../middleware/validation');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// Public routes
router.get('/', destinationController.getAllDestinations);
router.get('/search', destinationController.searchDestinations);
router.get('/:id', destinationController.getDestinationById);

// Protected routes (admin only)
router.post('/', requireAuth, requireAdmin, validateDestination, destinationController.createDestination);
router.put('/:id', requireAuth, requireAdmin, validateDestination, destinationController.updateDestination);
router.delete('/:id', requireAuth, requireAdmin, destinationController.deleteDestination);

module.exports = router; 