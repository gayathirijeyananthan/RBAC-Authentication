const mongoose = require('mongoose');

// Define the Resource schema
const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    educator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
}, { timestamps: true });

// Create and export the Resource model
module.exports = mongoose.model('Resource', resourceSchema);
