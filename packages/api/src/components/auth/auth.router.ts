import { Router } from 'express';
import passport from 'passport';

export const passportRouter = Router();

passportRouter.get('/auth/github', passport.authenticate('github', { scope: ['repo'] }));
passportRouter.get('/auth/github/callback', passport.authenticate('github'), (_req, res) => {
  res.redirect('/');
});
passportRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
passportRouter.get('/auth/google/callback', passport.authenticate('google'), (_req, res) => {
  res.redirect('/');
});
