// ========================================
// CONFIGURATION FILE
// ========================================
// Update these URLs when deploying to production

const CONFIG = {
    // Development (localhost)
    development: {
        API_BASE_URL: 'http://localhost:5000/api',
        FRONTEND_URL: 'http://localhost:3000'
    },
    
    // Production (update with your actual URLs)
    production: {
        API_BASE_URL: 'https://travel44u-backend.onrender.com/api',
        FRONTEND_URL: 'https://travel44u.netlify.app'
    }
};

// Auto-detect environment
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const currentConfig = isProduction ? CONFIG.production : CONFIG.development;

// Export configuration
window.APP_CONFIG = {
    API_BASE_URL: currentConfig.API_BASE_URL,
    FRONTEND_URL: currentConfig.FRONTEND_URL,
    IS_PRODUCTION: isProduction
};

console.log('🌍 Environment:', isProduction ? 'Production' : 'Development');
console.log('🔗 API URL:', window.APP_CONFIG.API_BASE_URL); 