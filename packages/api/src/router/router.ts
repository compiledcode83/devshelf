import { Router } from 'express';
import { passportRouter } from '../components/auth/auth.router';
import { sessionRouter } from '../components/session/session.router';

export const router = Router();
router.use('/auth', passportRouter);
router.use('/session', sessionRouter);
