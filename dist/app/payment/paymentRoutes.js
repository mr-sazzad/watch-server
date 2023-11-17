"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeRoutes = void 0;
const express_1 = require("express");
const stripeController_1 = require("./stripeController");
const router = (0, express_1.Router)();
router.post("/create-checkout-session", stripeController_1.createCheckoutSessionController);
exports.stripeRoutes = router;
