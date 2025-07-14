const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

// Import configurations and utilities
const connectDB = require('./config/database');
const { errorHandler, notFound } = require('./utils/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const destinationRoutes = require('./routes/destinations');
const packageRoutes = require('./routes/packages');
const contactRoutes = require('./routes/contact');


const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// MIDDLEWARE SETUP
// ========================================

// CORS
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] 
        : ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true
}));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'travel_secret_key_2024',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Static files
app.use(express.static(path.join(__dirname, '../')));

// ========================================
// API ROUTES
// ========================================

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/contact', contactRoutes);


// ========================================
// FRONTEND ROUTING
// ========================================

// Serve frontend routes (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// ========================================
// ERROR HANDLING
// ========================================

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// ========================================
// DATABASE CONNECTION & SERVER START
// ========================================

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        
        // Start server
        app.listen(PORT, () => {
            console.log('🚀 Server running on port', PORT);
            console.log('📱 Frontend: http://localhost:' + PORT);
            console.log('🔧 API Base: http://localhost:' + PORT + '/api');
            console.log('🏥 Health Check: http://localhost:' + PORT + '/api/contact/health');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error('❌ Unhandled Rejection:', err);
    // Close server & exit process
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    // Close server & exit process
    process.exit(1);
});

// Start the server
startServer();

module.exports = app; 