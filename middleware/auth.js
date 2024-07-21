const jwt = require('jsonwebtoken'); // Import the jsonwebtoken module for working with JWTs
const db = require('../database'); // Import the database connection module

// Middleware function to verify JWT and authenticate the user
const verifyToken = (req, res, next) => {
  // Extract the JWT token from cookies
  const token = req.cookies.jwt;
  
  // If no token is found, redirect the user to the login page with a 401 status
  if (!token) {
    return res.status(401).redirect('/login');
  }

  // Verify the token using the secret key defined in environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If there's an error in token verification, redirect to the login page with a 401 status
    if (err) {
      return res.status(401).redirect('/login');
    }

    // Query the database to find the user by the decoded ID from the token
    db.query('SELECT * FROM users WHERE Id = ?', [decoded.id], (error, results) => {
      // If there's a database error or no user is found, redirect to the login page with a 401 status
      if (error || !results.length) {
        return res.status(401).redirect('/login');
      }
      
      // Attach the user information to the request object for use in subsequent middleware/routes
      req.user = results[0];
      
      // Call the next middleware or route handler
      next();
    });
  });
};

// Export the middleware function for use in other parts of the application
module.exports = verifyToken;
