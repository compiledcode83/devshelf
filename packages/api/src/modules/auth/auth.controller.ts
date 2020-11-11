import { Router } from 'express';
import passport from 'passport';

export const passportRouter = Router();

passportRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

passportRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  (_req, res) => {
    res.redirect('/good');
  },
);

passportRouter.get('/github', passport.authenticate('github'));

passportRouter.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/failed' }),
  (_req, res) => {
    res.redirect('/good');
  },
);

passportRouter.get('/logout', (req, res) => {
  // @ts-ignore
  req.session = null;
  req.logout();
  res.redirect('/');
});
