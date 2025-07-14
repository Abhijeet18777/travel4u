const User = require('../models/User');
const bcrypt = require('bcrypt');

// User Registration
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create new user
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword 
        });
        await user.save();
        
        // Set session
        req.session.userId = user._id;
        
        res.json({ 
            success: true, 
            message: 'Registration successful',
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        // Set session
        req.session.userId = user._id;
        
        res.json({ 
            success: true, 
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

// User Logout
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ success: true, message: 'Logout successful' });
    });
};

// Check Authentication Status
const checkAuth = async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.json({ loggedIn: false });
        }
        
        const user = await User.findById(req.session.userId).select('-password');
        if (!user) {
            return res.json({ loggedIn: false });
        }
        
        res.json({ 
            loggedIn: true, 
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Auth check error:', error);
        res.json({ loggedIn: false });
    }
};

// Update User Profile
const updateProfile = async (req, res) => {
    try {
        const { name, email, currentPassword, newPassword } = req.body;
        const user = await User.findById(req.session.userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Update basic info
        if (name) user.name = name;
        if (email) user.email = email;
        
        // Update password if provided
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Current password is incorrect' });
            }
            user.password = await bcrypt.hash(newPassword, 12);
        }
        
        await user.save();
        
        res.json({ 
            success: true, 
            message: 'Profile updated successfully',
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ error: 'Profile update failed' });
    }
};

// Password Reset
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Hash new password
        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();
        
        res.json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ error: 'Password reset failed' });
    }
};

module.exports = {
    register,
    login,
    logout,
    checkAuth,
    updateProfile,
    resetPassword
}; 