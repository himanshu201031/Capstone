import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const syncSchema = z.object({
  userId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  score: z.number().int().nonnegative(),
  timeTaken: z.number().int().nonnegative(),
  streak: z.number().int().nonnegative(),
  hintsUsed: z.number().int().nonnegative(),
  hintsRemaining: z.number().int().nonnegative()
});

export const validateSync = (req: Request, res: Response, next: NextFunction) => {
  const result = syncSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues });
  }
  (req as any).validated = result.data;
  next();
};
