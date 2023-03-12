import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
//Import Data source class
import { DataSource } from 'typeorm';
//Import some middleware
import cors from 'cors';
import bodyParser from 'body-parser';
//Import entity
import { Task } from './src/tasks/tasks.entity';

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

app.get('/', (req: Request, res: Response) => {
  res.send('Express server with typescript');
});

//Initialize db connection
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
    console.log('Data source has been initialized');
  })
  .catch((err) => {
    console.error('Error during Data source initialization', err);
  });
