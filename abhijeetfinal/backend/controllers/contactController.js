const Message = require('../models/Message');

// Send contact message
const sendMessage = async (req, res) => {
    try {
        const { 
            name, 
            email, 
            phone, 
            subject, 
            destination, 
            travelers, 
            budget, 
            message, 
            newsletter,
            timestamp 
        } = req.body;
        
        const newMessage = new Message({ 
            name, 
            email, 
            phone: phone || '', 
            subject, 
            destination: destination || '', 
            travelers: travelers || '', 
            budget: budget || '', 
            message, 
            newsletter: newsletter || false,
            timestamp: timestamp || new Date()
        });
        await newMessage.save();
        
        res.json({ 
            success: true, 
            message: 'Message sent successfully' 
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// Get all messages (admin only)
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

// Get single message by ID
const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json(message);
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ error: 'Failed to fetch message' });
    }
};

// Delete message
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        
        res.json({ 
            success: true, 
            message: 'Message deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
};

// Mark message as read
const markMessageAsRead = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        
        res.json({ 
            success: true, 
            message: 'Message marked as read',
            message 
        });
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json({ error: 'Failed to mark message as read' });
    }
};

// Get unread messages count
const getUnreadCount = async (req, res) => {
    try {
        const count = await Message.countDocuments({ read: false });
        res.json({ unreadCount: count });
    } catch (error) {
        console.error('Error getting unread count:', error);
        res.status(500).json({ error: 'Failed to get unread count' });
    }
};

// Search messages
const searchMessages = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }
        
        const messages = await Message.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } },
                { subject: { $regex: query, $options: 'i' } },
                { destination: { $regex: query, $options: 'i' } },
                { travelers: { $regex: query, $options: 'i' } },
                { budget: { $regex: query, $options: 'i' } },
                { message: { $regex: query, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
        
        res.json(messages);
    } catch (error) {
        console.error('Error searching messages:', error);
        res.status(500).json({ error: 'Failed to search messages' });
    }
};

module.exports = {
    sendMessage,
    getAllMessages,
    getMessageById,
    deleteMessage,
    markMessageAsRead,
    getUnreadCount,
    searchMessages
}; 