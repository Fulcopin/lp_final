import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number;
  username: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        message: 'Authentication required'
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    // Add user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
};

// Validation middleware
export const validateMessage = (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  const { content, receiverId } = req.body;

  if (!content || !receiverId) {
    return res.status(400).json({
      message: 'Content and receiverId are required'
    });
  }

  if (typeof content !== 'string' || content.length > 1000) {
    return res.status(400).json({
      message: 'Invalid message content'
    });
  }

  next();
};