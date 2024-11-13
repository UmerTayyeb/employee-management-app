// Remove JWT-related imports and functions
const authenticate = (roleRequired) => (req, res, next) => {
    const userRole = req.headers['role']; // Get role from headers
    if (!userRole) return res.status(403).send('Role is required');
  
    // Check if the user has the required role
    if (userRole !== roleRequired) {
      return res.status(403).send('Access denied');
    }
    next();
  };
  
  module.exports = { authenticate };

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');

// const generateToken = (user) => {
//   return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// const authenticate = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(403).send('Token is required');

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).send('Invalid token');
//     req.user = decoded;
//     next();
//   });
// };

// module.exports = { generateToken, authenticate };
