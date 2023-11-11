import { Router } from "express";
import {
  createWatch,
  deleteWatch,
  getAllWatches,
  getSingleWatch,
  updateWatch,
} from "./productController";
import auth from "../middleware/auth";
import { userRole } from "../types";

const router = Router();

router.post("/create", auth(userRole.admin, userRole.super_admin), createWatch);

router.get("/", getAllWatches);

router.get("/:id", getSingleWatch);

router.patch("/:id", updateWatch);

router.delete("/:id", auth(userRole.admin, userRole.super_admin), deleteWatch);

export const WatchRoutes = router;
