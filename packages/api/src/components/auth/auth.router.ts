import { Router } from 'express';
import passport from 'passport';

export const authRouter = Router();

authRouter.get('/auth/github', passport.authenticate('github', { scope: ['repo'] }));
authRouter.get('/auth/github/callback', passport.authenticate('github'), (_req, res) => {
  res.redirect('http://localhost:5000/');
});
