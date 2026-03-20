import { Router } from 'express';
import { validateSync } from '../middleware/validation';
import { prisma } from '../prisma/client';

const router = Router();

router.post('/sync', validateSync, async (req, res) => {
  const data = (req as any).validated;
  try {
    await prisma.dailyScore.upsert({
      where: { userId_date: { userId: data.userId, date: new Date(data.date) } },
      update: {
        score: data.score,
        timeTaken: data.timeTaken,
        streak: data.streak,
        hintsUsed: data.hintsUsed,
        hintsRemaining: data.hintsRemaining
      },
      create: {
        userId: data.userId,
        date: new Date(data.date),
        score: data.score,
        timeTaken: data.timeTaken,
        streak: data.streak,
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
