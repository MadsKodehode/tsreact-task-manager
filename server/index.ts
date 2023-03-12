import express, { Express } from 'express';
import dotenv from 'dotenv';
//Import Data source class
import { DataSource } from 'typeorm';
//Import some middleware
import cors from 'cors';
import bodyParser from 'body-parser';
//Import entity
import { Task } from './src/tasks/tasks.entity';
import { taskRouter } from './src/tasks/task.router';

const app: Express = express();
dotenv.config();
//Parse request body
app.use(bodyParser.json());
//Cors middleware
app.use(cors());

//Creating database connection settings
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true,
});

//Port
const PORT = process.env.PORT;

//Initialize db connection
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
    console.log('Data source has been initialized');
  })
  .catch((err) => {
    console.error('Error during Data source initialization', err);
  });

app.use('/tasks', taskRouter);
