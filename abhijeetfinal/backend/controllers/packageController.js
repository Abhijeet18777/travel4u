const Package = require('../models/Package');

// Get all packages
const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find().sort({ name: 1 });
        res.json(packages);
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
};

// Get single package by ID
const getPackageById = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.json(package);
    } catch (error) {
        console.error('Error fetching package:', error);
        res.status(500).json({ error: 'Failed to fetch package' });
    }
};

// Create new package
const createPackage = async (req, res) => {
    try {
        const { name, destination, duration, price, description } = req.body;
        
        const package = new Package({ name, destination, duration, price, description });
        await package.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Package created successfully',
            package 
        });
    } catch (error) {
        console.error('Error creating package:', error);
        res.status(500).json({ error: 'Failed to create package' });
    }
};

// Update package
const updatePackage = async (req, res) => {
    try {
        const { name, destination, duration, price, description } = req.body;
        
        const package = await Package.findByIdAndUpdate(
            req.params.id,
            { name, destination, duration, price, description },
            { new: true, runValidators: true }
        );
        
        if (!package) {
            return res.status(404).json({ error: 'Package not found' });
        }
        
        res.json({ 
            success: true, 
            message: 'Package updated successfully',
            package 
        });
    } catch (error) {
        console.error('Error updating package:', error);
        res.status(500).json({ error: 'Failed to update package' });
    }
};

// Delete package
const deletePackage = async (req, res) => {
    try {
        const package = await Package.findByIdAndDelete(req.params.id);
        
        if (!package) {
            return res.status(404).json({ error: 'Package not found' });
        }
        
        res.json({ 
            success: true, 
            message: 'Package deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting package:', error);
        res.status(500).json({ error: 'Failed to delete package' });
    }
};

// Get packages by destination
const getPackagesByDestination = async (req, res) => {
    try {
        const { destination } = req.params;
        
        const packages = await Package.find({
            destination: { $regex: destination, $options: 'i' }
        }).sort({ price: 1 });
        
        res.json(packages);
    } catch (error) {
        console.error('Error fetching packages by destination:', error);
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
};

// Search packages
const searchPackages = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }
        
        const packages = await Package.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { destination: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        }).sort({ price: 1 });
        
        res.json(packages);
    } catch (error) {
        console.error('Error searching packages:', error);
        res.status(500).json({ error: 'Failed to search packages' });
    }
};

// Get packages by price range
const getPackagesByPriceRange = async (req, res) => {
    try {
        const { min, max } = req.query;
        
        let query = {};
        if (min && max) {
            query.price = { $gte: parseFloat(min), $lte: parseFloat(max) };
        } else if (min) {
            query.price = { $gte: parseFloat(min) };
        } else if (max) {
            query.price = { $lte: parseFloat(max) };
        }
        
        const packages = await Package.find(query).sort({ price: 1 });
        res.json(packages);
    } catch (error) {
        console.error('Error fetching packages by price range:', error);
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
};

module.exports = {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage,
    getPackagesByDestination,
    searchPackages,
    getPackagesByPriceRange
}; 