import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const syncSchema = z.object({
  userId: z.string().uuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(val => {
      const inputDate = new Date(val);
      const today = new Date();
      today.setHours(0,0,0,0);
      return inputDate <= today;
  }, { message: "Date cannot be in the future" }),
  score: z.number().int().min(0, "Score must be positive").max(2000, "Score too high"),
  timeTaken: z.number().int().min(5, "Time taken must be at least 5 seconds"),
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
