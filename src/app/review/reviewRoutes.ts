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

router.get("/watch/:id", getAllReviews);

router.get("/latest", getLatestReviews);

export const ReviewRoutes = router;
