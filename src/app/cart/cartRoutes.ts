import { Router } from "express";
import {
  addToCart,
  deleteSingleCart,
  getAllFromCart,
  getSingleCart,
  updateSingleCart,
} from "./cartController";

const router = Router();

router.post("/create", addToCart);

router.get("/", getAllFromCart);

router.get("/:id", getSingleCart);

router.patch("/:id", updateSingleCart);

router.delete("/:id", deleteSingleCart);

export const CartRoutes = router;
