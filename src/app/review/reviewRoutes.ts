import { Router } from "express";
import { createAReview, getAllReviews } from "./reviewController";
import auth from "../middleware/auth";
import { userRole } from "../types";

const router = Router();

router.post("/create", auth(userRole.user), createAReview);

router.post("/", getAllReviews);

export const ReviewRoutes = router;
