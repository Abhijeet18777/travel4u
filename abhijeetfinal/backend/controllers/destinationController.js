const Destination = require('../models/Destination');

// Get all destinations
const getAllDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find().sort({ name: 1 });
        res.json(destinations);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ error: 'Failed to fetch destinations' });
    }
};

// Get single destination by ID
const getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }
        res.json(destination);
    } catch (error) {
        console.error('Error fetching destination:', error);
        res.status(500).json({ error: 'Failed to fetch destination' });
    }
};

// Create new destination
const createDestination = async (req, res) => {
    try {
        const { name, image, description } = req.body;
        
        const destination = new Destination({ name, image, description });
        await destination.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Destination created successfully',
            destination 
        });
    } catch (error) {
        console.error('Error creating destination:', error);
        res.status(500).json({ error: 'Failed to create destination' });
    }
};

// Update destination
const updateDestination = async (req, res) => {
    try {
        const { name, image, description } = req.body;
        
        const destination = await Destination.findByIdAndUpdate(
            req.params.id,
            { name, image, description },
            { new: true, runValidators: true }
        );
        
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }
        
        res.json({ 
            success: true, 
            message: 'Destination updated successfully',
            destination 
        });
    } catch (error) {
        console.error('Error updating destination:', error);
        res.status(500).json({ error: 'Failed to update destination' });
    }
};

// Delete destination
const deleteDestination = async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);
        
        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }
        
        res.json({ 
            success: true, 
            message: 'Destination deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting destination:', error);
        res.status(500).json({ error: 'Failed to delete destination' });
    }
};

// Search destinations
const searchDestinations = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }
        
        const destinations = await Destination.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).sort({ name: 1 });
        
        res.json(destinations);
    } catch (error) {
        console.error('Error searching destinations:', error);
        res.status(500).json({ error: 'Failed to search destinations' });
    }
};

module.exports = {
    getAllDestinations,
    getDestinationById,
    createDestination,
    updateDestination,
    deleteDestination,
    searchDestinations
}; 