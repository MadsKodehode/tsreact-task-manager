import { AppDataSource } from '../..';
import { Task } from './tasks.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';
class TaskController {
  //Get Task method
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

  //Create Task method
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

  //Update Task method
  public async update(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Check if task exists in db
    let task: Task | null;
    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });
    } catch (error) {
      return res.json({ error: 'Internal server error' }).status(500);
    }

    //IF not exist return not found
    if (!task) {
      return res.status(404).json({
        error: `Task with id: ${req.body.id} does not exist`,
      });
    }

    //If task exist create var to hold updatedTask
    let updatedTask: UpdateResult;

    //Update task with given req body id
    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        req.body.id,
        //Convert literal object to a partial instance of Task entity
        plainToInstance(Task, {
          status: req.body.status,
        }),
      );

      //Convert updatedTask instance to object literal
      updatedTask = instanceToPlain(updatedTask) as UpdateResult;

      return res.json(updatedTask).status(200);
    } catch (error) {
      return res.json({ error: 'Internal server error' }).status(500);
    }
  }
}

export const taskController = new TaskController();
