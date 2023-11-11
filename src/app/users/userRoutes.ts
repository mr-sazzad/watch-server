import { Router } from "express";
import {
  banUser,
  createUser,
  getAllUsers,
  loginUser,
  updateUser,
  getSingleUser,
  getAllAdmins,
  updateSingleUser,
} from "./userController";
import { userRole } from "../types";
import auth from "../middleware/auth";

const router = Router();

router.post("/signup", createUser);

router.post("/login", loginUser);

router.patch("/ban", auth(userRole.admin, userRole.super_admin), banUser);

router.get("/", getAllUsers);

router.get("/admin-user", auth(userRole.super_admin), getAllAdmins);

router.get("/:id", getSingleUser);

router.patch("/:id", updateUser);

router.patch("/update/:id", updateSingleUser); // auth(userRole.admin),

export const UserRoutes = router;
