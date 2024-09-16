const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (roles) => {
  return (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access forbidden: Insufficient rights' });
      }

      next();
    } catch (err) {
      res.status(400).json({ error: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
