const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Protected routes
router.get('/admin', authMiddleware(['admin']), (req, res) => {
  res.send('Admin Panel');
});

router.get('/user', authMiddleware(['user']), (req, res) => {
  res.send('User Dashboard');
});

module.exports = router;
