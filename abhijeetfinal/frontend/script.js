// ========================================
// TRAVEL & TOURISM WEBSITE - MAIN SCRIPT
// ========================================

// ========================================
// USER AUTHENTICATION & PROFILE
// ========================================

// Navbar authentication logic
window.addEventListener('DOMContentLoaded', async () => {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    try {
        const res = await fetch(window.APP_CONFIG.API_BASE_URL + '/auth/me');
        const data = await res.json();
        
        if (data.loggedIn) {
            // Show user name and logout
            const li = document.createElement('li');
            li.innerHTML = `<span style="color:#0077b6;font-weight:600;">Hi, ${data.name}</span>`;
            navLinks.appendChild(li);
            
            const logoutLi = document.createElement('li');
            const logoutBtn = document.createElement('button');
            logoutBtn.textContent = 'Logout';
            logoutBtn.style.background = '#d90429';
            logoutBtn.style.color = '#fff';
            logoutBtn.style.border = 'none';
            logoutBtn.style.padding = '0.5rem 1.2rem';
            logoutBtn.style.borderRadius = '20px';
            logoutBtn.style.cursor = 'pointer';
            logoutBtn.style.fontWeight = '500';
            logoutBtn.addEventListener('click', async () => {
                await fetch(window.APP_CONFIG.API_BASE_URL + '/auth/logout', { method: 'POST' });
                window.location.href = 'index.html';
            });
            logoutLi.appendChild(logoutBtn);
            navLinks.appendChild(logoutLi);
        } else {
            // Show login/register links if not present
            if (!document.querySelector('a[href="login.html"]')) {
                const loginLi = document.createElement('li');
                loginLi.innerHTML = '<a href="login.html">Login</a>';
                navLinks.appendChild(loginLi);
            }
            if (!document.querySelector('a[href="register.html"]')) {
                const regLi = document.createElement('li');
                regLi.innerHTML = '<a href="register.html">Register</a>';
                navLinks.appendChild(regLi);
            }
        }
    } catch (e) {
        console.error('Auth check failed:', e);
    }
});

// Login form handling
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const msg = document.getElementById('loginMessage');
        msg.textContent = '';
        msg.style.background = '';
        
        try {
            const res = await fetch(window.APP_CONFIG.API_BASE_URL + '/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (data.success) {
                msg.textContent = 'Login successful! Redirecting...';
                msg.style.background = 'rgba(76, 175, 80, 0.2)';
                msg.style.color = '#4caf50';
                setTimeout(() => window.location.href = 'index.html', 1000);
            } else {
                msg.textContent = data.error || 'Login failed.';
                msg.style.background = 'rgba(244, 67, 54, 0.2)';
                msg.style.color = '#f44336';
            }
        } catch (error) {
            msg.textContent = 'Network error. Please try again.';
            msg.style.background = 'rgba(244, 67, 54, 0.2)';
            msg.style.color = '#f44336';
        }
    });
}

// Register form handling
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const msg = document.getElementById('registerMessage');
        msg.textContent = '';
        msg.style.background = '';
        
        try {
            const res = await fetch(window.APP_CONFIG.API_BASE_URL + '/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            
            if (data.success) {
                msg.textContent = 'Registration successful! Welcome aboard!';
                msg.style.background = 'rgba(76, 175, 80, 0.2)';
                msg.style.color = '#4caf50';
                setTimeout(() => window.location.href = 'index.html', 1500);
            } else {
                msg.textContent = data.error || 'Registration failed.';
                msg.style.background = 'rgba(244, 67, 54, 0.2)';
                msg.style.color = '#f44336';
            }
        } catch (error) {
            msg.textContent = 'Network error. Please try again.';
            msg.style.background = 'rgba(244, 67, 54, 0.2)';
            msg.style.color = '#f44336';
        }
    });
}

// Password reset form handling
const resetForm = document.getElementById('resetForm');
if (resetForm) {
    resetForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value.trim();
        const password = document.getElementById('resetPassword').value.trim();
        const msg = document.getElementById('resetMessage');
        msg.textContent = '';
        
        try {
            const res = await fetch(window.APP_CONFIG.API_BASE_URL + '/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (data.success) {
                msg.textContent = 'Password reset successful! You can now log in.';
                msg.style.color = '#0077b6';
                resetForm.reset();
            } else {
                msg.textContent = data.error || 'Reset failed.';
                msg.style.color = '#d90429';
            }
        } catch (error) {
            msg.textContent = 'Network error. Please try again.';
            msg.style.color = '#d90429';
        }
    });
}

// Profile page authentication check
async function checkAuth() {
    try {
        const res = await fetch(window.APP_CONFIG.API_BASE_URL + '/auth/me');
        const data = await res.json();
        
        if (!data.loggedIn) {
            window.location.href = 'login.html';
        } else {
            const profileInfo = document.getElementById('profileInfo');
            const profileName = document.getElementById('profileName');
            
            if (profileInfo) {
                profileInfo.innerHTML = `<strong>Name:</strong> ${data.name}<br><strong>Email:</strong> ${data.email || ''}`;
            }
            if (profileName) {
                profileName.value = data.name;
            }
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = 'login.html';
    }
}

// Profile update form handling
const updateProfileForm = document.getElementById('updateProfileForm');
if (updateProfileForm) {
    updateProfileForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('profileName').value.trim();
        const password = document.getElementById('profilePassword').value.trim();
        const msg = document.getElementById('profileMessage');
        msg.textContent = '';
        
        try {
            const res = await fetch(window.APP_CONFIG.API_BASE_URL + '/auth/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password })
            });
            const data = await res.json();
            
            if (data.success) {
                msg.textContent = 'Profile updated successfully!';
                msg.style.color = '#0077b6';
                setTimeout(() => window.location.reload(), 1000);
            } else {
                msg.textContent = data.error || 'Update failed.';
                msg.style.color = '#d90429';
            }
        } catch (error) {
            msg.textContent = 'Network error. Please try again.';
            msg.style.color = '#d90429';
        }
    });
}

// ========================================
// DESTINATIONS & PACKAGES
// ========================================

// Load destinations
async function loadDestinations() {
    try {
        const response = await fetch(window.APP_CONFIG.API_BASE_URL + '/destinations');
        const destinations = await response.json();
        
        const container = document.getElementById('destinations-container');
        if (!container) return;
        
        container.innerHTML = destinations.map(dest => `
            <div class="destination-card">
                <img src="${dest.image}" alt="${dest.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Travel+Destination'">
                <div class="destination-info">
                    <h3>${dest.name}</h3>
                    <p class="location">📍 ${dest.location}</p>
                    <p class="description">${dest.description}</p>
                    <div class="price">$${dest.price}</div>
                    <button onclick="bookDestination('${dest._id}')" class="book-btn">Book Now</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading destinations:', error);
        const container = document.getElementById('destinations-container');
        if (container) {
            container.innerHTML = '<p>Error loading destinations. Please try again later.</p>';
        }
    }
}

// Load packages
async function loadPackages() {
    try {
        const response = await fetch(window.APP_CONFIG.API_BASE_URL + '/packages');
        const packages = await response.json();
        
        const container = document.getElementById('packages-container');
        if (!container) return;
        
        container.innerHTML = packages.map(pkg => `
            <div class="package-card">
                <div class="package-header">
                    <h3>${pkg.name}</h3>
                    <span class="duration">${pkg.duration} days</span>
                </div>
                <div class="package-details">
                    <p><strong>Destination:</strong> ${pkg.destination}</p>
                    <p class="description">${pkg.description}</p>
                    <div class="price">$${pkg.price}</div>
                    <button onclick="bookPackage('${pkg._id}')" class="book-btn">Book Package</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading packages:', error);
        const container = document.getElementById('packages-container');
        if (container) {
            container.innerHTML = '<p>Error loading packages. Please try again later.</p>';
        }
    }
}

// Booking functions
function bookDestination(destinationId) {
    // Check if user is logged in
    if (!document.querySelector('.nav-links button')) {
        alert('Please login to book destinations.');
        window.location.href = 'login.html';
        return;
    }
    
    // Implement booking logic
    alert('Booking feature coming soon!');
}

function bookPackage(packageId) {
    // Check if user is logged in
    if (!document.querySelector('.nav-links button')) {
        alert('Please login to book packages.');
        window.location.href = 'login.html';
        return;
    }
    
    // Implement booking logic
    alert('Booking feature coming soon!');
}

// ========================================
// CONTACT FORM
// ========================================

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const msg = document.getElementById('contactMessageDisplay');
        
        msg.textContent = '';
        msg.style.background = '';
        
        if (!name || !email || !subject || !message) {
            msg.textContent = 'Please fill in all fields.';
            msg.style.background = 'rgba(244, 67, 54, 0.2)';
            msg.style.color = '#f44336';
            return;
        }
        
        try {
            const res = await fetch(window.APP_CONFIG.API_BASE_URL + '/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });
            const data = await res.json();
            
            if (data.success) {
                msg.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                msg.style.background = 'rgba(76, 175, 80, 0.2)';
                msg.style.color = '#4caf50';
                contactForm.reset();
            } else {
                msg.textContent = data.error || 'Failed to send message.';
                msg.style.background = 'rgba(244, 67, 54, 0.2)';
                msg.style.color = '#f44336';
            }
        } catch (error) {
            msg.textContent = 'Network error. Please try again.';
            msg.style.background = 'rgba(244, 67, 54, 0.2)';
            msg.style.color = '#f44336';
        }
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Show form messages
function showFormMessage(message, type) {
    const msgElement = document.getElementById('formMessage');
    if (msgElement) {
        msgElement.textContent = message;
        msgElement.style.background = type === 'success' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)';
        msgElement.style.color = type === 'success' ? '#4caf50' : '#f44336';
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Initialize page-specific functions
document.addEventListener('DOMContentLoaded', function() {
    // Load destinations if on homepage
    if (document.getElementById('destinations-container')) {
        loadDestinations();
    }
    
    // Load packages if on packages page
    if (document.getElementById('packages-container')) {
        loadPackages();
    }
    
    // Check auth if on profile page
    if (window.location.pathname.includes('profile.html')) {
        checkAuth();
    }
    
    // Initialize contact form counter
    const messageTextarea = document.getElementById('contactMessage');
    if (messageTextarea) {
        const updateCount = () => {
            const remaining = 500 - messageTextarea.value.length;
            const counter = document.getElementById('charCount');
            if (counter) {
                counter.textContent = remaining;
                counter.style.color = remaining < 50 ? '#f44336' : '#666';
            }
        };
        
        messageTextarea.addEventListener('input', updateCount);
        updateCount();
    }
}); 