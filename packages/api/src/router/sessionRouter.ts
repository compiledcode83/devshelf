import { Router } from 'express';
import { sessionController } from '../controllers/sessionController';

export const sessionRouter = Router();

sessionRouter.get('/me', sessionController);
