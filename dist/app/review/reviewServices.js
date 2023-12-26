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
exports.ReviewsServices = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const createAReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = data.userId;
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            id: userId,
        },
    });
    if (!isUserExist) {
        throw new apiError_1.default(403, "Unauthorized For Review");
    }
    if (isUserExist.role !== "user") {
        throw new apiError_1.default(403, "only user is allowed to submit review");
    }
    const result = yield prisma_1.default.watchReview.create({
        data,
    });
    return result;
});
const getAllReviews = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.watchReview.findMany({
        where: {
            watchId: productId,
        },
        include: {
            product: true,
            author: true,
        },
    });
    return result;
});
const getLatestReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.watchReview.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 12,
    });
    if (!result) {
        throw new apiError_1.default(400, "something went wrong");
    }
    return result;
});
exports.ReviewsServices = {
    createAReview,
    getAllReviews,
    getLatestReviews,
};
