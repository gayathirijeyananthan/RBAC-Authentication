// models/Resource.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    // link to educator who created it
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
