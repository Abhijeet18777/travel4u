const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    subject: { type: String, required: true },
    destination: { type: String, default: '' },
    travelers: { type: String, default: '' },
    budget: { type: String, default: '' },
    message: { type: String, required: true },
    newsletter: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema); 