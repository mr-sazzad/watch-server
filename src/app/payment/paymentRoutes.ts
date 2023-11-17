import { Router } from "express";
import {
  createCheckoutSessionController,
  getAllPayments,
  getAllRecentPayments,
  handlePaymentSuccess,
} from "./stripeController";

const router = Router();

router.get("/", getAllPayments);

router.get("/recent", getAllRecentPayments);

router.post("/create-checkout-session", createCheckoutSessionController);

router.patch("/update/:id", handlePaymentSuccess);

export const stripeRoutes = router;
