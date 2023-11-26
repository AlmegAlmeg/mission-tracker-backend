import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db/connection';

import { LoginRouter } from './routes/login';
import { GlobalRouter } from './routes/global';
import { UserRouter } from './routes/user';

import userMiddleware from './middleware/userMiddleware';
import { ProjectsRouter } from './routes/projects';

const PORT = 3333;
const app = express();

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

connectToDatabase();

app.use(express.json());
app.use(cors());

app.use('/', LoginRouter);
app.use('/', GlobalRouter);
app.use('/projects', ProjectsRouter);
app.use('/user', userMiddleware, UserRouter);
