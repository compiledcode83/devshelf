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
    resave: true,
    rolling: true,
  }),
);
app.use(CookieParser());

// passport.use(gitHubStrategy);
// passport.use(googleStrategy);

// passport.serializeUser<User, number>((user, done) => {
//   console.log(user);
//   done(null, user.id);
// });

// passport.deserializeUser<User, number>(async (id, done) => {
//   try {
//     const user = await findUserBy('id', id);
//     if (!user) {
//       return done(new Error('User not found'));
//     }
//     done(null, user);
//   } catch (e) {
//     done(e);
//   }
// });

passport.serializeUser<User, string>((user, done) => {
  console.log('serializeUser', user.id);
  done(null, user.id);
});

passport.deserializeUser<User, User>(async (user, done) => {
  try {
    const userId = user as unknown;
    const foundUser = await findUserBy('id', userId as string);
    if (!foundUser) {
      return done(new Error('User not found'));
    }
    done(null, user);
  } catch (e: unknown) {
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
