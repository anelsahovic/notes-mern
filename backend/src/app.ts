import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notes';
import userRoutes from './routes/users';
import createHttpError, { isHttpError } from 'http-errors';
import session from 'express-session';
import env from './utils/validateEnv';
import MongoStore from 'connect-mongo';
import { requiresAuth } from './middleware/auth';

const app = express();

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000 * 60 /* 6000 is one min, times how many mins you want*/,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGODB_CONNECTION_STRING,
    }),
  })
);

app.use('/api/users', userRoutes);
app.use('/api/notes', requiresAuth, notesRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint Not Found!'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
