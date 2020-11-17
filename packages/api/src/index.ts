import express, { RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import passport from 'passport';
import Session from 'express-session';
import CookieParser from 'cookie-parser';
import { User } from '@prisma/client';
import { findUserBy } from './modules/user/user.service';
import dotenv from 'dotenv';
import { getEnvVariable } from './utils/getEnvVariable';
import { projectsRouter } from './modules/projects/projects.controller';
import { gitHubStrategy, googleStrategy } from './modules/auth/auth.service';
import { passportRouter } from './modules/auth/auth.controller';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: getEnvVariable('ORIGIN') }));
app.use(helmet());
app.use(compression());
app.use(
  Session({
    secret: getEnvVariable('SESSION_SECRET'),
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: Number(getEnvVariable('COOKIE_EXPIRATION_TIME')),
      httpOnly: true,
      sameSite: 'lax',
    },
  }),
);
app.use(CookieParser());

passport.serializeUser<User, User>((user, done) => {
  done(undefined, user);
});

passport.deserializeUser<User, User>(async (user, done) => {
  try {
    const foundUser = await findUserBy('id', user.id);
    if (!foundUser) {
      return done(new Error('User not found'));
    }
    done(undefined, foundUser);
  } catch (e) {
    done(e);
  }
});

passport.use(gitHubStrategy);

passport.use(googleStrategy);

const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send(`main page ${req.user ? req.user : null}`));
app.get('/failed', (_req, res) => res.send('You Failed to log in!'));

app.get('/good', isLoggedIn, (req, res) => {
  if (req.user) {
    res.send('GOOOD!!!!');
  } else {
    res.send('BADDDDDDDD');
  }
});

app.use('/', passportRouter);
app.use('/projects', projectsRouter);

app.listen(5000, () => console.log(`Server is listening on port ${5000}!`));
