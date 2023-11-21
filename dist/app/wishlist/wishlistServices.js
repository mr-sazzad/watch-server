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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistService = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const addToWishlist = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.wishlist.create({ data });
    return result;
});
const getAllWishlists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.wishlist.findMany({
        where: {
            userId,
        },
        include: {
            user: true,
            watch: true,
        },
    });
    if (!result) {
        throw new apiError_1.default(500, "something went wrong");
    }
    return result;
});
const deleteSingleWishlist = (wishlistId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.wishlist.delete({
        where: {
            id: wishlistId,
        },
    });
    return result;
});
const deleteAllWishlists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.wishlist.deleteMany({
        where: {
            userId,
        },
    });
    return result;
});
exports.wishlistService = {
    addToWishlist,
    getAllWishlists,
    deleteSingleWishlist,
    deleteAllWishlists,
};
