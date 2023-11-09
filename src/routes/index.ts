import { Router } from "express";
import { UserRoutes } from "../app/users/userRoutes";
import { CartRoutes } from "../app/cart/cartRoutes";
import { WatchRoutes } from "../app/products/productRoutes";
import { stripeRoutes } from "../app/payment/paymentRoutes";

const router = Router();

router.use("/users", UserRoutes);

router.use("/cart", CartRoutes);

router.use("/watches", WatchRoutes);

router.use("/payment", stripeRoutes);

export const globalRoutes = router;
