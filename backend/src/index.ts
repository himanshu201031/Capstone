import express from 'express';
import cors from 'cors';
import syncRouter from './routes/sync';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', syncRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
