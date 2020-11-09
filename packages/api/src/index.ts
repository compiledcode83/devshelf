import express, { RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import passport from 'passport';
import Session from 'express-session';
import CookieParser from 'cookie-parser';
import { User } from '@prisma/client';
import { gitHubStrategy, googleStrategy } from './components/auth/services/passportStrategies';
import { findUserBy } from './components/user/user.service';
import { router } from './router/router';
import dotenv from 'dotenv';
import { getEnvVariable } from './utils/getEnvVariable';
import { projectsRouter } from './components/projects/projects.controller';
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
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(CookieParser(getEnvVariable('SESSION_SECRET')));

passport.use(gitHubStrategy);
passport.use(googleStrategy);

passport.serializeUser<User, number>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser<User, number>(async (id, done) => {
  try {
    const user = await findUserBy('id', id);
    if (!user) {
      return done(new Error('User not found'));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);
app.use('/projects', projectsRouter);

const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get('/', (_req, res) => res.send('Example Home page!'));
app.get('/failed', (_req, res) => res.send('You Failed to log in!'));

app.get('/api/auth/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user}!`));

const PORT = process.env.PORT || 5000;

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

async function main() {
  const find = await findUserBy('id', 1);
  console.log(find);
}
main();
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
