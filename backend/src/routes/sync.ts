import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { validateSync } from '../middleware/validation';
import { prisma } from '../../prisma/client';
import { rateLimit } from 'express-rate-limit';

const router = Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 30, // Limit to 30 syncs per minute per user 
  message: 'Too many requests, please try again after a minute',
});

router.post('/sync', limiter, authenticate, validateSync, async (req: AuthRequest, res) => {
  const data = (req as any).validated;
  try {
    await prisma.dailyScore.upsert({
      where: { userId_date: { userId: data.userId, date: new Date(data.date) } },
      update: {
        score: data.score,
        timeTaken: data.timeTaken,
        hintsUsed: data.hintsUsed,
        hintsRemaining: data.hintsRemaining
      },
      create: {
        userId: data.userId,
        date: new Date(data.date),
        score: data.score,
        timeTaken: data.timeTaken,
        hintsUsed: data.hintsUsed,
        hintsRemaining: data.hintsRemaining
      }
    });
    res.json({ status: 'success', message: 'Sync saved' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
