import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Not authorized, no token provided' } });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_here');

    const user = await User.findById(decoded.id).select('-passwordHash');
    if (!user) {
      return res.status(401).json({ success: false, error: { code: 'USER_NOT_FOUND', message: 'Not authorized, user no longer exists' } });
    }
    
    if (user.status === 'SUSPENDED') {
      return res.status(403).json({ success: false, error: { code: 'USER_SUSPENDED', message: 'User account is suspended' } });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Not authorized, token failed' } });
  }
};
