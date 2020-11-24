import { Router } from 'express';
import passport from 'passport';
import { PASSPORT_GOOGLE, PASSPORT_GITHUB } from './constants/passportConstants';

export const passportRouter = Router();

passportRouter.get(
  '/google',
  passport.authenticate(PASSPORT_GOOGLE, { scope: ['profile', 'email'] }),
);

passportRouter.get(
  '/google/callback',
  passport.authenticate(PASSPORT_GOOGLE, { failureRedirect: '/failed' }),
  (_req, res) => {
    res.redirect('/good');
  },
);

passportRouter.get('/github', passport.authenticate(PASSPORT_GITHUB));

passportRouter.get(
  '/github/callback',
  passport.authenticate(PASSPORT_GITHUB, { failureRedirect: '/failed' }),
  (_req, res) => {
    res.redirect('/good');
  },
);

passportRouter.get('/me', (req, res) => {
  res.json(req.user);
});

passportRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
