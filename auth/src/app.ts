import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signoutRouther } from './routes/signout';
import { signinRouter } from './routes/singin';
import { signupRouther } from './routes/signup';
import { errorHandler, NotFoundError } from '@freddycruger/common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    // secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter);
app.use(signoutRouther);
app.use(signinRouter);
app.use(signupRouther);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
