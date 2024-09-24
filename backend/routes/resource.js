const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const authMiddleware = require('../middleware/authMiddleware');



// Route to add a new resource, accessible only by educators
router.post('/add', authMiddleware(['educator']), async (req, res) => {
    const { title, description, link } = req.body;

    // Input validation
    if (!title || !description || !link) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new resource
        const resource = new Resource({
            title,
            description,
            link
        });

        // Save the resource to the database
        await resource.save();

        // Return success response
        res.status(201).json({ message: 'Resource created successfully', resource });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating resource', error: error.message });
    }
});

module.exports = router;

// UPDATE a resource (educator-only)
router.put('/:id', authMiddleware(['educator']), async (req, res) => {
    const { title, description, link } = req.body;
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });

        // Ensure the resource belongs to the educator making the request
        if (resource.educator.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        resource.title = title || resource.title;
        resource.description = description || resource.description;
        resource.link = link || resource.link;

        await resource.save();
        res.json({ message: 'Resource updated successfully', resource });
    } catch (error) {
        res.status(500).json({ message: 'Error updating resource' });
    }
});

// DELETE a resource (educator-only)
router.delete('/:id', authMiddleware(['educator']), async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });

        // Ensure the resource belongs to the educator making the request
        if (resource.educator.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await resource.remove();
        res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting resource' });
    }
});

module.exports = router;
