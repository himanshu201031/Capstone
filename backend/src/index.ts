import express from 'express';
import cors from 'cors';
import { prisma } from '../prisma/client';
import syncRouter from './routes/sync';
import authRouter from './routes/auth';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/sync', syncRouter);
app.use('/api/auth', authRouter);
app.get('/api/leaderboard', async (req, res) => {
    try {
        const type = req.query.type || 'daily';
        const now = new Date();
        const start = new Date(now);
        if (type === 'weekly') {
            start.setDate(now.getDate() - 7);
        } else {
            start.setHours(0, 0, 0, 0);
        }

        const topScores = await prisma.dailyScore.findMany({
            where: {
                date: { gte: start }
            },
            take: 100,
            orderBy: { score: 'desc' },
            include: { user: true }
        });
        res.json(topScores.map(s => ({ user: s.user.email?.split('@')[0] || 'Unknown', score: s.score, timeTaken: s.timeTaken })));
    } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
