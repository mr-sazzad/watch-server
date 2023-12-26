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
exports.getLatestReviews = exports.getAllReviews = exports.createAReview = void 0;
const reviewServices_1 = require("./reviewServices");
const createAReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const result = yield reviewServices_1.ReviewsServices.createAReview(data);
        res.status(201).json({
            status: 201,
            message: "Review Created",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createAReview = createAReview;
const getAllReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield reviewServices_1.ReviewsServices.getAllReviews(id);
        res.status(200).json({
            status: 200,
            message: "Review retrieved",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllReviews = getAllReviews;
const getLatestReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield reviewServices_1.ReviewsServices.getLatestReviews();
        res.status(200).json({
            status: 200,
            message: "Review's retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getLatestReviews = getLatestReviews;
