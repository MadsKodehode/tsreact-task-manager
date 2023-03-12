import { Router } from 'express';
import { taskController } from './tasks.controller';
import { createValidator } from './tasks.validator';

export const taskRouter: Router = Router();

taskRouter.get('/', taskController.getAll);

taskRouter.post('/', createValidator, taskController.create);
