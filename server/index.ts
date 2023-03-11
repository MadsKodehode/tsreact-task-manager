import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();
dotenv.config();

const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express server with typescript");
});

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));
