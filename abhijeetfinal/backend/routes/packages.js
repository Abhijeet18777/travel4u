const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { validatePackage } = require('../middleware/validation');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// Public routes
router.get('/', packageController.getAllPackages);
router.get('/search', packageController.searchPackages);
router.get('/destination/:destination', packageController.getPackagesByDestination);
router.get('/price-range', packageController.getPackagesByPriceRange);
router.get('/:id', packageController.getPackageById);

// Protected routes (admin only)
router.post('/', requireAuth, requireAdmin, validatePackage, packageController.createPackage);
router.put('/:id', requireAuth, requireAdmin, validatePackage, packageController.updatePackage);
router.delete('/:id', requireAuth, requireAdmin, packageController.deletePackage);

module.exports = router; 