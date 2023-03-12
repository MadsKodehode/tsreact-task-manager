import { AppDataSource } from '../..';
import { Task } from './tasks.entity';
import { instanceToPlain } from 'class-transformer';
export class TaskController {
  constructor(private taskRepository = AppDataSource.getRepository(Task)) {}

  public async getAll(): Promise<Task[]> {
    let allTasks: Task[];
    try {
      allTasks = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });
      //Converting task instance to array of objects
      allTasks = instanceToPlain(allTasks) as Task[];

      return allTasks;
    } catch (err) {
      throw new Error('Could not get tasks');
    }
  }
}
