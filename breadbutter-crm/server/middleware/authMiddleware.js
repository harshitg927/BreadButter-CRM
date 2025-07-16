const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Simple JWT verification middleware
function authenticateToken(req, res, next) {
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    // Find user and add to request
    const user = await User.findById(decoded.userId);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken; 