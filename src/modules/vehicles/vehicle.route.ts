import express from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("admin"), vehicleController.createVehicle);

router.get("/", vehicleController.getAllVehicles);

router.get("/:vehicleId", vehicleController.getVehicleByID);

router.put("/:vehicleId", auth("admin"), vehicleController.updateVehicleByID);

router.delete(
  "/:vehicleId",
  auth("admin"),
  vehicleController.deleteVehicleByID,
);

export const vehicleRoutes = router;
