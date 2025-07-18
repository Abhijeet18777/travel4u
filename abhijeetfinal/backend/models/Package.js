const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    destination: { type: String, required: true },
});

module.exports = mongoose.model('Package', PackageSchema); 