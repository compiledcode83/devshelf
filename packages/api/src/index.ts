import express, { RequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import passport from 'passport';
import Session from 'express-session';
import CookieParser from 'cookie-parser';
import { User } from '@prisma/client';
// import { findUserBy } from './components/user/user.service';
import dotenv from 'dotenv';
import { getEnvVariable } from './utils/getEnvVariable';
import { projectsRouter } from './modules/projects/projects.controller';

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
app.use(CookieParser('aaas'));

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

import { gitHubStrategy, googleStrategy } from './modules/auth/auth.service';
import { passportRouter } from './modules/auth/auth.controller';

passport.serializeUser<User, User>((user, done) => {
  /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
  done(null, user);
});

passport.deserializeUser<User, User>((user, done) => {
  /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
  done(null, user);
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

app.get('/', (_req, res) => res.send('main page'));
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
