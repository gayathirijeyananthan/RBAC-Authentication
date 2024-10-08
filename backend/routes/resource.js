// const express = require('express');
// const router = express.Router();
// const Resource = require('../models/Resource');
// const authMiddleware = require('../middleware/authMiddleware');



// // Route to add a new resource, accessible only by educators
// router.post('/add', authMiddleware(['educator']), async (req, res) => {
//     const { title, description, link } = req.body;

//     // Input validation
//     if (!title || !description || !link) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         // Create a new resource
//         const resource = new Resource({
//             title,
//             description,
//             link,
//             educator: req.user._id 
//         });

//         // Save the resource to the database
//         await resource.save();

//         // Return success response
//         res.status(201).json({ message: 'Resource created successfully', resource });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error creating resource', error: error.message });
//     }
// });

// module.exports = router;

// // UPDATE a resource (educator-only)
// router.put('/:id', authMiddleware(['educator']), async (req, res) => {
//     const { title, description, link } = req.body;
//     try {
//         const resource = await Resource.findById(req.params.id);
//         if (!resource) return res.status(404).json({ message: 'Resource not found' });

//         // Ensure the resource belongs to the educator making the request
//         if (resource.educator.toString() !== req.user._id.toString()) {
//             return res.status(401).json({ message: 'Not authorized' });
//         }

//         resource.title = title || resource.title;
//         resource.description = description || resource.description;
//         resource.link = link || resource.link;

//         await resource.save();
//         res.json({ message: 'Resource updated successfully', resource });
//     } catch (error) {
//         console.error(error); 
//          // Log the error for debugging
//         res.status(500).json({ message: 'Error updating resource', error: error.message });    }
// });

// // DELETE a resource (educator-only)
// router.delete('/:id', authMiddleware(['educator']), async (req, res) => {
//     try {
//         const resource = await Resource.findById(req.params.id);
//         if (!resource) return res.status(404).json({ message: 'Resource not found' });

//         // Ensure the resource belongs to the educator making the request
//         if (resource.educator.toString() !== req.user._id.toString()) {
//             return res.status(401).json({ message: 'Not authorized' });
//         }

//         await resource.remove();
//         res.json({ message: 'Resource deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting resource' });
//     }
// });

// module.exports = ronuter;


const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

// Get all resources
router.get('/', authMiddleware(['educator', 'admin','user']), async (req, res) => {
    try {
        const resources = await Resource.find(); // Fetch all resources from the database
        res.json(resources); // Return the resources in JSON format
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({ message: 'Error fetching resources', error: error.message });
    }
});


// Route to add a new resource, accessible only by educators
router.post('/add', authMiddleware(['educator']), async (req, res) => {
    const { title, description, link } = req.body;

    // Input validation
    if (!title || !description || !link) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if req.user is defined and has the _id property
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: 'User not authenticated' });
        }

        // Create a new resource, setting the educator to the current user's ID
        const resource = new Resource({
            title,
            description,
            link,
            educator: req.user._id // Set the educator field to the user's ID
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


router.put('/:id', authMiddleware(['educator']), async (req, res) => {
    const { title, description, link } = req.body;
    
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            console.error('Resource not found:', req.params.id);
            return res.status(404).json({ message: 'Resource not found' });

        }
        

        if (!req.user) {
            console.error('User not authenticated');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        console.log('Decoded user:', req.user); // Log the decoded user

        // if (resource.educator.toString() !== req.user.id) {
        //     return res.status(401).json({ message: 'Not authorized' });
        // }
          // Check if the authenticated user is the educator for this resource
          if (!resource.educator.equals(req.user._id)) {
            console.error('Not authorized: Educator ID mismatch');
            return res.status(403).json({ message: 'Not authorized' });
        }

        resource.title = title || resource.title;
        resource.description = description || resource.description;
        resource.link = link || resource.link;

        await resource.save();
        res.json({ message: 'Resource updated successfully', resource });
    } catch (error) {
        console.error('Error updating resource:', error);
        res.status(500).json({ message: 'Error updating resource', error: error.message });
    }
});


// DELETE a resource (educator-only)
router.delete('/:id', authMiddleware(['educator']), async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });

        if (!req.user) {
            console.error('User not authenticated');
            return res.status(401).json({ message: 'User not authenticated' });
        }
        // Ensure the resource belongs to the educator making the request
        if (!resource.educator.equals(req.user._id)) {
            console.error('Not authorized: Educator ID mismatch');
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Resource.findByIdAndDelete(req.params.id);
        res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
        console.error('Error deleting resource:', error);
        res.status(500).json({ message: 'Error deleting resource', error: error.message });
    }
});

module.exports = router;
