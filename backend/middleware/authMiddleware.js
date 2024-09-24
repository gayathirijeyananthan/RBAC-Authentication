const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ error: 'Access denied' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Set req.user to the decoded token

            // Log to verify correct user information

            if (roles && !roles.includes(req.user.role)) {
                return res.status(403).json({ error: 'Access forbidden: Insufficient rights' });
            }

            next();
        } catch (err) {
            console.error('JWT verification error:', err);
            return res.status(400).json({ error: 'Invalid token' });
        }
    };
};

module.exports = authMiddleware;
