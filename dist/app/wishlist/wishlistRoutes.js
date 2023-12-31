"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRoutes = void 0;
const express_1 = require("express");
const wishlistController_1 = require("./wishlistController");
const router = (0, express_1.Router)();
router.post("/add", wishlistController_1.addToWishlist);
router.get("/:id", wishlistController_1.getAllWishlists);
router.delete("/delete/all/:id", wishlistController_1.deleteAllWishLists);
router.delete("/delete/:id", wishlistController_1.deleteSingleWishList);
exports.WishlistRoutes = router;
