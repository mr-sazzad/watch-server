import { Router } from "express";
import { UserRoutes } from "../app/users/userRoutes";

const router = Router();

router.use('/users', UserRoutes);

export const globalRoutes = router;