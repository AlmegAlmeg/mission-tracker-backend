import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db/connection';

/* Routers */
import { LoginRouter } from './routes/login';
import { GlobalRouter } from './routes/global';
import { UserRouter } from './routes/user';
import { ProjectsRouter } from './routes/projects';
import { TimeLogRouter } from './routes/timeLogs';
import { ListsRouter } from './routes/lists';

/* Middleware */
import userMiddleware from './middleware/userMiddleware';
import { MissionsRouter } from './routes/mission';

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
app.use('/lists', ListsRouter);
app.use('/missions', MissionsRouter);
app.use('/user', userMiddleware, UserRouter);
app.use('/time-logs', TimeLogRouter);
