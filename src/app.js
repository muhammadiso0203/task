import express, { Router } from 'express';
import { config } from 'dotenv';
import { connectDB } from './db/index.js'
import taskRouter from './routes/taskRoutes.js'
config();

const app = express()
const PORT = +process.env.PORT;

app.use(express.json());
await connectDB();

app.use('/task', taskRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));