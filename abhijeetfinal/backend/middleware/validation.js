// Validation middleware for common input validation

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password && password.length >= 6;
};

// User registration validation
const validateRegistration = (req, res, next) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (name.trim().length < 2) {
        return res.status(400).json({ error: 'Name must be at least 2 characters long' });
    }
    
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    
    if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    
    next();
};

// User login validation
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    
    next();
};

// Contact form validation
const validateContact = (req, res, next) => {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Name, email, subject, and message are required' });
    }
    
    if (name.trim().length < 2) {
        return res.status(400).json({ error: 'Name must be at least 2 characters long' });
    }
    
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    
    if (subject.trim().length < 3) {
        return res.status(400).json({ error: 'Subject must be at least 3 characters long' });
    }
    
    if (message.trim().length < 10) {
        return res.status(400).json({ error: 'Message must be at least 10 characters long' });
    }
    
    // Optional phone validation if provided
    if (req.body.phone && req.body.phone.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = req.body.phone.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            return res.status(400).json({ error: 'Please enter a valid phone number' });
        }
    }
    
    next();
};

// Destination validation
const validateDestination = (req, res, next) => {
    const { name, image, description } = req.body;
    
    if (!name || !image || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (name.trim().length < 3) {
        return res.status(400).json({ error: 'Destination name must be at least 3 characters long' });
    }
    
    if (description.trim().length < 10) {
        return res.status(400).json({ error: 'Description must be at least 10 characters long' });
    }
    
    next();
};

// Package validation
const validatePackage = (req, res, next) => {
    const { name, destination, duration, price, description } = req.body;
    
    if (!name || !destination || !duration || !price || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (name.trim().length < 3) {
        return res.status(400).json({ error: 'Package name must be at least 3 characters long' });
    }
    
    if (price <= 0) {
        return res.status(400).json({ error: 'Price must be greater than 0' });
    }
    
    if (description.trim().length < 10) {
        return res.status(400).json({ error: 'Description must be at least 10 characters long' });
    }
    
    next();
};

module.exports = {
    validateRegistration,
    validateLogin,
    validateContact,
    validateDestination,
    validatePackage
}; 