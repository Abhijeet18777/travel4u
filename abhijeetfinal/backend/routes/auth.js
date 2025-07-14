const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const { requireAuth } = require('../middleware/auth');

// Public routes
router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.checkAuth);
router.post('/reset-password', authController.resetPassword);

// Protected routes
router.put('/profile', requireAuth, authController.updateProfile);

module.exports = router; 