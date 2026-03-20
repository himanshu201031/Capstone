import request from 'supertest';
import express from 'express';
import syncRouter from '../src/routes/sync';

const app = express();
app.use(express.json());
app.use('/api', syncRouter);

test('POST /api/sync returns success', async () => {
  const res = await request(app)
    .post('/api/sync')
    .send({
      userId: '00000000-0000-0000-0000-000000000000',
      date: '2026-03-20',
      score: 100,
      timeTaken: 45,
      streak: 5,
      hintsUsed: 1,
      hintsRemaining: 2
    });
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('success');
});
