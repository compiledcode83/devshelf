import { Router } from 'express';
import passport from 'passport';

export const passportRouter = Router();

passportRouter.get('/login/github', passport.authenticate('github', { scope: ['repo'] }));
passportRouter.get('/login/github/callback', passport.authenticate('github'), (_req, res) => {
  res.redirect('/good');
});
passportRouter.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));
passportRouter.get('/login/google/callback', passport.authenticate('google'), (_req, res) => {
  res.redirect('/good');
});
