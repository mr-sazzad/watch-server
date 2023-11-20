import { Router } from "express";
import {
  addToWishlist,
  deleteAllWishLists,
  deleteSingleWishList,
  getAllWishlists,
} from "./wishlistController";

const router = Router();

router.post("/create", addToWishlist);

router.get("/:id", getAllWishlists);

router.delete("/delete/all/:id", deleteAllWishLists);

router.delete("/delete/:id", deleteSingleWishList);

export const WishlistRoutes = router;
