import express from 'express';
import cors from 'cors';
import syncRouter from './routes/sync';
import authRouter from './routes/auth';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', syncRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
