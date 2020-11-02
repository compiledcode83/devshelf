import type { RequestHandler } from 'express';
import passport from 'passport';

export const githubController: RequestHandler = (req, res, next) => {
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/account',
  })(req, res, next);
};
