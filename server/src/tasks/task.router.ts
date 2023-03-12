import { Router, Request, Response } from 'express';
import { TaskController } from './tasks.controller';
export const taskRouter: Router = Router();

taskRouter.get('/', async (req: Request, res: Response) => {
  const taskController = new TaskController();
  const tasks = await taskController.getAll();

  res.status(200).json(tasks);
});
