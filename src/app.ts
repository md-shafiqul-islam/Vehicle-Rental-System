import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.route";
import { vehicleRoutes } from "./modules/vehicles/vehicle.route";
import { userRoutes } from "./modules/users/user.route";
import { bookingRoutes } from "./modules/bookings/booking.route";

const app = express();

// parser
app.use(express.json());

// initializing DB
initDB();

// auth routes
app.use("/api/v1/auth", authRoutes);

// vehicle routes
app.use("/api/v1/vehicles", vehicleRoutes);

// user routes
app.use("/api/v1/users", userRoutes);

// booking routes
app.use("/api/v1/bookings", bookingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from vehicle rental system");
});

export default app;
