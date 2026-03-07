import express from "express";
import auth from "../../middleware/auth";
import { userControllers } from "./user.controller";

const router = express.Router();

router.get("/", auth("admin"), userControllers.getAllUsers);

router.put(
  "/:userId",
  auth("admin", "customer"),
  userControllers.updateUserByID,
);

router.delete("/:userId", auth("admin"), userControllers.deleteUserByID);

export const userRoutes = router;
