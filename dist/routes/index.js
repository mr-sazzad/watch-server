"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalRoutes = void 0;
const express_1 = require("express");
const userRoutes_1 = require("../app/users/userRoutes");
const cartRoutes_1 = require("../app/cart/cartRoutes");
const productRoutes_1 = require("../app/products/productRoutes");
const paymentRoutes_1 = require("../app/payment/paymentRoutes");
const blogRoutes_1 = require("../app/blog/blogRoutes");
const router = (0, express_1.Router)();
router.use("/users", userRoutes_1.UserRoutes);
router.use("/cart", cartRoutes_1.CartRoutes);
router.use("/watches", productRoutes_1.WatchRoutes);
router.use("/payment", paymentRoutes_1.stripeRoutes);
router.use("/blogs", blogRoutes_1.BlogRoutes);
exports.globalRoutes = router;