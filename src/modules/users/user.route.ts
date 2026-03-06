import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/signup", userControllers.signupUser);

export const userRoutes = router;
