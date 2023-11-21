"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllWishLists = exports.deleteSingleWishList = exports.getAllWishlists = exports.addToWishlist = void 0;
const wishlistServices_1 = require("./wishlistServices");
const addToWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield wishlistServices_1.wishlistService.addToWishlist(data);
        res.status(201).json({
            status: 201,
            message: "Watch Added to Wishlist",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.addToWishlist = addToWishlist;
const getAllWishlists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // trying to get all wishlists using userId
        const { id } = req.params;
        const result = yield wishlistServices_1.wishlistService.getAllWishlists(id);
        res.status(200).json({
            status: 200,
            message: "wishlists retrieved",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllWishlists = getAllWishlists;
const deleteSingleWishList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // trying to delete single wishlist using wishlist id
        const { id } = req.params;
        const result = yield wishlistServices_1.wishlistService.deleteSingleWishlist(id);
        res.status(200).json({
            status: 200,
            message: "Wishlist deleted",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteSingleWishList = deleteSingleWishList;
const deleteAllWishLists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // trying to delete all wishlists using userId
        const { id } = req.params;
        const result = yield wishlistServices_1.wishlistService.deleteAllWishlists(id);
        res.status(200).json({
            status: 200,
            message: "Wishlists deleted",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteAllWishLists = deleteAllWishLists;
