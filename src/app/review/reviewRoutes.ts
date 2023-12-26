import { Router } from "express";
import {
  createAReview,
  getAllReviews,
  getLatestReviews,
} from "./reviewController";
import auth from "../middleware/auth";
import { userRole } from "../types";

const router = Router();

router.post("/create", auth(userRole.user), createAReview);

router.get("/latest", getLatestReviews);

router.get("/watch/:id", getAllReviews);

export const ReviewRoutes = router;
