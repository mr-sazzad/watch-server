import { Router } from "express";
import {
  banUser,
  createUser,
  getAllUsers,
  loginUser,
  updateUser,
  getSingleUser,
} from "./userController";
import { userRole } from "../types";
import auth from "../middleware/auth";

const router = Router();

router.post("/signup", createUser);

router.post("/login", loginUser);

router.patch("/ban", auth(userRole.admin, userRole.super_admin), banUser);

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.patch("/:id", updateUser);

export const UserRoutes = router;
