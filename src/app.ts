import express, { Request, Response } from "express";
import initDB from "./config/db";

const app = express();

// parser
app.use(express.json());

// initializing DB
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from vehicle rental system");
});

export default app;
