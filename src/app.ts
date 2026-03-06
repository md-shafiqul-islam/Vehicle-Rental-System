import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { vehicleRoutes } from "./modules/vehicles/vehicle.route";

const app = express();

// parser
app.use(express.json());

// initializing DB
initDB();

// users routes
app.use("/api/v1/auth", userRoutes);

// auth routes
app.use("/api/v1/auth", authRoutes);

// vehicle routes
app.use("/api/v1/vehicles", vehicleRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from vehicle rental system");
});

export default app;
