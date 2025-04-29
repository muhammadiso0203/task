import express from 'express';
import { config } from 'dotenv';
import {connectDB} from './db/index.js'
import morgan from 'morgan';
import taskRouter from './routes/taskRoutes.js'
import cookieParser from "cookie-parser"
import userRouter from "./routes/userRoutes.js"
import fs from "fs";
import path from "path";
config();

const app = express()
const PORT = +process.env.PORT;

app.use(express.json());
app.use(cookieParser());
await connectDB();


const __dirname = path.resolve();
const filePath = fs.createWriteStream(path.join(__dirname, "acces.log"), {
    flag: "a",
});

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(morgan('combined', {
        stream: filePath
    })
    );
} else {
    app.use(morgan("dev")
    );
}


app.use('/task', taskRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));