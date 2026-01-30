import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, config.jwt.secret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

export const authenticateAdmin = (req, res, next) => {
  try {
    const adminPassword = req.headers['x-admin-password'];
    
    if (adminPassword !== config.admin.password) {
      return res.status(403).json({ message: '❌ Unauthorized! Invalid admin credentials.' });
    }
    
    next();
  } catch (error) {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
};
