import { Router } from "express";
import { UserRoutes } from "../app/users/userRoutes";
import { CartRoutes } from "../app/cart/cartRoutes";
import { WatchRoutes } from "../app/products/productRoutes";

const router = Router();

router.use("/users", UserRoutes);

router.use("/cart", CartRoutes);

router.use("/watch", WatchRoutes);

export const globalRoutes = router;
