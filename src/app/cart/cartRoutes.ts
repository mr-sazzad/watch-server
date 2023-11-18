import { Router } from "express";
import {
  addToCart,
  deleteSingleCart,
  getAllFromCart,
  getSingleCart,
  removeAllFromCart,
  updateSingleCart,
} from "./cartController";

const router = Router();

router.post("/create", addToCart);

router.get("/", getAllFromCart);

router.delete("/remove/:id", removeAllFromCart);

router.get("/:id", getSingleCart);

router.patch("/:id", updateSingleCart);

router.delete("/:id", deleteSingleCart);

export const CartRoutes = router;
