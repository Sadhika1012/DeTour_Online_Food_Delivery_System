const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });
  
    try {
      const decoded = jwt.verify(token, 'secret_key'); // Verify the token
      const user = await User.findOne({ _id: decoded.userId, 'tokens.token': token });
  
      if (!user) {
        return res.status(401).json({ message: 'Access denied' });
      }
  
      req.user = user; // Store the user in the request for further use
      next(); // Move to the next middleware
    } catch (error) {
      return res.status(401).json({ message: 'Access denied' });
    }
  };

  const checkAdminRole = (req, res, next) => {
    if (req.user.role === 'admin') {
      next(); // User is an admin; proceed to the route handler
    } else {
      res.status(403).json({ message: 'Access denied. You are not an admin.' });
    }
  };
  
  module.exports = {
    verifyToken,
    checkAdminRole,
  };  