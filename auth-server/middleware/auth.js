const jwt = require('jsonwebtoken'); 

// You can define JWT_SECRET in your .env file
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('Authorization')?.split(' ')[1];

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add decoded user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle expired token case
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired', expired: true });
    }
    // Handle other errors related to invalid tokens
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
