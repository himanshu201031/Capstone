import { Router } from 'express';
import { prisma } from '../../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/google', async (req, res) => {
  try {
    const { token: idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: 'Token is required' });

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
        return res.status(401).json({ error: 'Invalid Google token' });
    }

    let user = await prisma.user.findUnique({ where: { email: payload.email } });

    if (!user) {
        // Create new OAuth user
        user = await prisma.user.create({
            data: {
                email: payload.email,
            }
        });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, userId: user.id });
  } catch (e) {
    console.error(e);
    res.status(401).json({ error: 'Google authentication failed' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = authSchema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, userId: user.id });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ error: e.errors });
    }
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = authSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, userId: user.id });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ error: e.errors });
    }
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/init', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                streakCount: 0,
                totalPoints: 0
            }
        });
        res.json({ userId: user.id, streak: user.streakCount });
    } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
