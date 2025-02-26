import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to verify token
export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Access Denied',
      message: 'No authentication token provided'
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid Token',
        message: 'The provided token is malformed or invalid'
      });
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token Expired',
        message: 'The authentication token has expired'
      });
    }
    
    return res.status(500).json({
      error: 'Authentication Error',
      message: 'An unexpected error occurred during authentication'
    });
  }
};
