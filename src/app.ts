import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.route";

const app = express();

// parser
app.use(express.json());

// initializing DB
initDB();

// users routes
app.use("/api/v1/auth", userRoutes);

// auth routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from vehicle rental system");
});

export default app;
