const express = require('express');
const { register, login, Eduregister } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

//Educator route
router.post('/educator/register', Eduregister);

// Protected routes
router.get('/admin', authMiddleware(['admin']), (req, res) => {
  res.send('Admin Panel');
});

router.get('/user', authMiddleware(['user']), (req, res) => {
  res.send('User Dashboard');
});

router.get('/educator/register', authMiddleware(['educator']), (req, res) => {
  res.send('Educator Dashboard');
});

module.exports = router;
