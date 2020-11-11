import type { RequestHandler } from 'express';

export const sessionController: RequestHandler = (req, res) => {
  res.json(req.user);
};
