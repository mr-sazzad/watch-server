import { Router } from "express";
import {
  createCheckoutSessionController,
  getAllPayments,
  handlePaymentSuccess,
} from "./stripeController";

const router = Router();

router.post("/create-checkout-session", createCheckoutSessionController);

router.patch("/update/:id", handlePaymentSuccess);

router.get("/:id", getAllPayments);

export const stripeRoutes = router;
