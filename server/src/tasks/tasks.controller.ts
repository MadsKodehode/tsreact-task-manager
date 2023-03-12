import { AppDataSource } from '../..';
import { Task } from './tasks.entity';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
class TaskController {
  //Method for getting Tasks
  public async getAll(req: Request, res: Response): Promise<Response> {
    let allTasks: Task[];
    try {
      //Try to get Tasks in ascending order
      allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: 'ASC',
        },
      });

      //Convert Task instance to plain array of Task objects
      allTasks = instanceToPlain(allTasks) as Task[];
      //Return all tasks
      return res.status(200).json(allTasks);
    } catch (err) {
      return res.json({ error: 'Internal server error' }).status(500);
    }
  }
  //Method for creating Task
  public async create(req: Request, res: Response): Promise<Response> {
    //Store validation result for the incoming request
    const errors = validationResult(req);
    //IF there are errors
    if (!errors.isEmpty()) {
      //THEN send back bad request with array of errors
      return res.status(400).json({ errors: errors.array() });
    }

    //Create new instance of Task
    const newTask = new Task();

    //Add required properties to Task
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    let createdTask: Task;

    try {
      //Try to save the newly created Task to db
      createdTask = await AppDataSource.getRepository(Task).save(newTask);

      //Convert instance of createdTask to plain object
      createdTask = instanceToPlain(createdTask) as Task;
      //Return with created task
      return res.json(createdTask).status(201);
    } catch (error) {
      return res.json({ error: 'Internal server error' }).status(500);
    }
  }
}

export const taskController = new TaskController();
