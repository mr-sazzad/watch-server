import { Router } from "express";
import { createCheckoutSessionController } from "./stripeController";

const router = Router();

router.post("/create-checkout-session", createCheckoutSessionController);

export const stripeRoutes = router;
