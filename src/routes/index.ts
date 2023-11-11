import { Router } from "express";
import { UserRoutes } from "../app/users/userRoutes";
import { CartRoutes } from "../app/cart/cartRoutes";
import { WatchRoutes } from "../app/products/productRoutes";
import { stripeRoutes } from "../app/payment/paymentRoutes";
import { BlogRoutes } from "../app/blog/blogRoutes";

const router = Router();

router.use("/users", UserRoutes);

router.use("/cart", CartRoutes);

router.use("/watches", WatchRoutes);

router.use("/payment", stripeRoutes);

router.use("/blogs", BlogRoutes);

export const globalRoutes = router;
