import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.route";

const app = express();

// parser
app.use(express.json());

// initializing DB
initDB();

app.use("/api/v1/auth", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from vehicle rental system");
});

export default app;
