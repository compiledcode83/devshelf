import { Router } from 'express';
import passport from 'passport';

export const passportRouter = Router();

passportRouter.get('/auth/github', passport.authenticate('github', { scope: ['repo'] }));
passportRouter.get('/auth/github/callback', passport.authenticate('github'), (_req, res) => {
  res.redirect('http://localhost:5000/');
});
