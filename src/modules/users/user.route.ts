import express from "express";
import auth from "../../middleware/auth";
import { userControllers } from "./user.controller";

const router = express.Router();

router.get("/", auth("admin"), userControllers.getAllUsers);

export const userRoutes = router;
