import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  // For MVP/Scaffold logic, we can allow a specific mock token or check Header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.user = decoded;
    next();
  } catch (err) {
    // For MVP/Demo purposes, let's also allow a mock guest token 'GUEST_TOKEN'
    if (token === 'GUEST_TOKEN_123') {
        req.user = { userId: req.body.userId || '00000000-0000-0000-0000-000000000001' };
        return next();
    }
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
