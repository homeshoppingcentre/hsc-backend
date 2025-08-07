import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth';
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  console.log('Root route hit');
  res.send('HSC backend is working!');
});

console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('🟢 Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
