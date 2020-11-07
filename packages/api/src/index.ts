import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import passport from 'passport';
import Session from 'express-session';
import CookieParser from 'cookie-parser';
import { User } from '@prisma/client';
import { strategy as GitHubStrategy } from './components/auth/services/passportGitHubStategy';
import { strategy as GoogleStategy } from './components/auth/services/passportGoogleStrategy';
import { findUserById } from './components/user/user.service';
import { router } from './router/router';
import dotenv from 'dotenv';
import { getEnvVariable } from './utils/getEnvVariable';

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
app.use(passport.initialize());
app.use(passport.session());

passport.use(GitHubStrategy);
passport.use(GoogleStategy);

passport.serializeUser<User, number>((user, done) => {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser<User, number>(async (id, done) => {
  try {
    const user = await findUserById(id);
    console.log(user);

    if (!user) {
      return done(new Error('User not found'));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
});

app.use('/api', router);

const PORT = process.env.PORT || 5000;

app.use('/', (_, res) => {
  res.send("You're not logged in");
});

app.get('/logout', function (req, res) {
  req.session = undefined;
  req.logout();
  res.redirect('/');
});

async function main() {
  const find = await findUserById(1);
  console.log(find);
}
main();
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
