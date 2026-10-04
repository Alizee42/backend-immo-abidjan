import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthPayload {
  userId: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AuthPayload;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET non configuré côté serveur' });
  }

  const header = req.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  if (!token) {
    return res.status(401).json({ error: 'Non authentifié' });
  }

  try {
    req.admin = jwt.verify(token, JWT_SECRET) as AuthPayload;
    next();
  } catch {
    res.status(401).json({ error: 'Session invalide ou expirée' });
  }
}
