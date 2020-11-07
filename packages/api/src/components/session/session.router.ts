import { Router } from 'express';
import { sessionController } from './session.controller';

export const sessionRouter = Router();

sessionRouter.get('/me', sessionController);
