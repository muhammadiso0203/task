import express, { Router } from 'express';
import { config } from 'dotenv';
import { connectDB } from './db/index.js'
import taskRouter from './routes/taskRoutes.js'
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes.js"
config();

const app = express()
const PORT = +process.env.PORT;

app.use(express.json());
app.use(cookieParser());
await connectDB();

app.use('/task', taskRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));