// Admin Dashboard JavaScript
const API_BASE_URL = window.APP_CONFIG.API_BASE_URL;

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    setupNavigation();
    loadDashboard();
});

// Authentication check
async function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../frontend/login.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Authentication failed');
        }

        const user = await response.json();
        if (user.email !== 'admin@travel44u.com') {
            alert('Admin access required');
            window.location.href = '../frontend/login.html';
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        window.location.href = '../frontend/login.html';
    }
}

// Setup navigation
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.admin-section');

    navButtons.forEach(button => {
        if (button.classList.contains('logout-btn')) return;
        
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // Update active button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                    loadSectionData(targetSection);
                }
            });
        });
    });
}

// Load section data
async function loadSectionData(section) {
    switch(section) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'destinations':
            loadDestinations();
            break;
        case 'packages':
            loadPackages();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'users':
            loadUsers();
            break;
    }
}

// Load dashboard statistics
async function loadDashboard() {
    try {
        const token = localStorage.getItem('token');
        
        // Load destinations count
        const destinationsResponse = await fetch(`${API_BASE_URL}/destinations`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const destinations = await destinationsResponse.json();
        document.getElementById('destinations-count').textContent = destinations.length || 0;

        // Load packages count
        const packagesResponse = await fetch(`${API_BASE_URL}/packages`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const packages = await packagesResponse.json();
        document.getElementById('packages-count').textContent = packages.length || 0;

        // Load unread messages count
        const messagesResponse = await fetch(`${API_BASE_URL}/contact/unread-count`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const unreadCount = await messagesResponse.json();
        document.getElementById('unread-messages').textContent = unreadCount.count || 0;

        // Load users count (you might need to create this endpoint)
        document.getElementById('users-count').textContent = 'N/A';
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Load destinations
async function loadDestinations() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/destinations`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const destinations = await response.json();
        
        const container = document.getElementById('destinations-list');
        if (destinations.length === 0) {
            container.innerHTML = '<p>No destinations found.</p>';
            return;
        }

        container.innerHTML = destinations.map(dest => `
            <div class="data-item">
                <h4>${dest.name}</h4>
                <p><strong>Location:</strong> ${dest.location}</p>
                <p><strong>Description:</strong> ${dest.description.substring(0, 100)}...</p>
                <p><strong>Price:</strong> $${dest.price}</p>
                <div class="action-buttons">
                    <button class="edit-btn" onclick="editDestination('${dest._id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteDestination('${dest._id}')">Delete</button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading destinations:', error);
        document.getElementById('destinations-list').innerHTML = '<p>Error loading destinations.</p>';
    }
}

// Load packages
async function loadPackages() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/packages`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const packages = await response.json();
        
        const container = document.getElementById('packages-list');
        if (packages.length === 0) {
            container.innerHTML = '<p>No packages found.</p>';
            return;
        }

        container.innerHTML = packages.map(pkg => `
            <div class="data-item">
                <h4>${pkg.name}</h4>
                <p><strong>Destination:</strong> ${pkg.destination}</p>
                <p><strong>Duration:</strong> ${pkg.duration}</p>
                <p><strong>Price:</strong> $${pkg.price}</p>
                <p><strong>Description:</strong> ${pkg.description.substring(0, 100)}...</p>
                <div class="action-buttons">
                    <button class="edit-btn" onclick="editPackage('${pkg._id}')">Edit</button>
                    <button class="delete-btn" onclick="deletePackage('${pkg._id}')">Delete</button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading packages:', error);
        document.getElementById('packages-list').innerHTML = '<p>Error loading packages.</p>';
    }
}

// Load messages
async function loadMessages() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/contact`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const messages = await response.json();
        
        const container = document.getElementById('messages-list');
        if (messages.length === 0) {
            container.innerHTML = '<p>No messages found.</p>';
            return;
        }

        container.innerHTML = messages.map(msg => `
            <div class="data-item ${msg.read ? '' : 'unread'}">
                <h4>${msg.name}</h4>
                <p><strong>Email:</strong> ${msg.email}</p>
                <p><strong>Subject:</strong> ${msg.subject}</p>
                <p><strong>Message:</strong> ${msg.message.substring(0, 150)}...</p>
                <p><strong>Date:</strong> ${new Date(msg.createdAt).toLocaleDateString()}</p>
                <p><strong>Status:</strong> ${msg.read ? 'Read' : 'Unread'}</p>
                <div class="action-buttons">
                    <button class="edit-btn" onclick="viewMessage('${msg._id}')">View</button>
                    <button class="delete-btn" onclick="deleteMessage('${msg._id}')">Delete</button>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading messages:', error);
        document.getElementById('messages-list').innerHTML = '<p>Error loading messages.</p>';
    }
}

// Load users (placeholder)
async function loadUsers() {
    document.getElementById('users-list').innerHTML = '<p>User management feature coming soon...</p>';
}

// Modal functions
function showModal(content) {
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close button functionality
document.querySelector('.close').onclick = closeModal;

// Add destination form
function showAddDestinationForm() {
    const form = `
        <h2>Add New Destination</h2>
        <form id="destination-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="location">Location</label>
                <input type="text" id="location" name="location" required>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" name="description" rows="4" required></textarea>
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" id="price" name="price" min="0" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="image">Image URL</label>
                <input type="url" id="image" name="image" required>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Add Destination</button>
            </div>
        </form>
    `;
    showModal(form);
    
    document.getElementById('destination-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addDestination();
    });
}

// Add package form
function showAddPackageForm() {
    const form = `
        <h2>Add New Package</h2>
        <form id="package-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="destination">Destination</label>
                <input type="text" id="destination" name="destination" required>
            </div>
            <div class="form-group">
                <label for="duration">Duration (days)</label>
                <input type="number" id="duration" name="duration" min="1" required>
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" id="price" name="price" min="0" step="0.01" required>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" name="description" rows="4" required></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Add Package</button>
            </div>
        </form>
    `;
    showModal(form);
    
    document.getElementById('package-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addPackage();
    });
}

// API functions
async function addDestination() {
    try {
        const form = document.getElementById('destination-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/destinations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            closeModal();
            loadDestinations();
            loadDashboard();
            alert('Destination added successfully!');
        } else {
            throw new Error('Failed to add destination');
        }
    } catch (error) {
        console.error('Error adding destination:', error);
        alert('Error adding destination');
    }
}

async function addPackage() {
    try {
        const form = document.getElementById('package-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/packages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            closeModal();
            loadPackages();
            loadDashboard();
            alert('Package added successfully!');
        } else {
            throw new Error('Failed to add package');
        }
    } catch (error) {
        console.error('Error adding package:', error);
        alert('Error adding package');
    }
}

async function deleteDestination(id) {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/destinations/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            loadDestinations();
            loadDashboard();
            alert('Destination deleted successfully!');
        } else {
            throw new Error('Failed to delete destination');
        }
    } catch (error) {
        console.error('Error deleting destination:', error);
        alert('Error deleting destination');
    }
}

async function deletePackage(id) {
    if (!confirm('Are you sure you want to delete this package?')) return;
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/packages/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            loadPackages();
            loadDashboard();
            alert('Package deleted successfully!');
        } else {
            throw new Error('Failed to delete package');
        }
    } catch (error) {
        console.error('Error deleting package:', error);
        alert('Error deleting package');
    }
}

async function deleteMessage(id) {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            loadMessages();
            loadDashboard();
            alert('Message deleted successfully!');
        } else {
            throw new Error('Failed to delete message');
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        alert('Error deleting message');
    }
}

// Placeholder functions for edit operations
function editDestination(id) {
    alert('Edit destination functionality coming soon...');
}

function editPackage(id) {
    alert('Edit package functionality coming soon...');
}

function viewMessage(id) {
    alert('View message functionality coming soon...');
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    window.location.href = '../frontend/login.html';
} 