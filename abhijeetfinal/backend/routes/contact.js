const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Travel44U API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Public routes
router.post('/', validateContact, contactController.sendMessage);

// Protected routes (admin only)
router.get('/', requireAuth, requireAdmin, contactController.getAllMessages);
router.get('/unread-count', requireAuth, requireAdmin, contactController.getUnreadCount);
router.get('/search', requireAuth, requireAdmin, contactController.searchMessages);
router.get('/:id', requireAuth, requireAdmin, contactController.getMessageById);
router.put('/:id/read', requireAuth, requireAdmin, contactController.markMessageAsRead);
router.delete('/:id', requireAuth, requireAdmin, contactController.deleteMessage);

module.exports = router; 