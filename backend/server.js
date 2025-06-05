import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import projectRoutes from './routes/project.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
