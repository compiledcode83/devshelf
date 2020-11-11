import { Router } from 'express';
import { passportRouter } from '../modules/auth/auth.controller';
import { sessionRouter } from '../modules/session/session.router';

export const router = Router();
router.use('/auth', passportRouter);
router.use('/session', sessionRouter);
