import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
// import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import Session from 'express-session';
import CookieParser from 'cookie-parser';
import { strategy as GitHubStrategy } from './services/passportGitHubStrategy';
import { findUserByEmail } from './services/user';
import { router } from './router/router';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
// const prisma = new PrismaClient();
passport.use(GitHubStrategy);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(
  Session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
  }),
);
app.use(CookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser<any, string>((user, done) => {
  done(null, user.username);
});

passport.deserializeUser<any, string>(async (email, done) => {
  try {
    const user = await findUserByEmail(email);
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
  res.status(200).send({ data: 'Siema' });
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

async function main() {
  const find = await findUserByEmail('test111');
  console.log(find);
}
main();
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
