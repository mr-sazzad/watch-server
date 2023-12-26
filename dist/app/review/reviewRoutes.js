"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const reviewController_1 = require("./reviewController");
const auth_1 = __importDefault(require("../middleware/auth"));
const types_1 = require("../types");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(types_1.userRole.user), reviewController_1.createAReview);
router.get("/latest", reviewController_1.getLatestReviews);
router.get("/watch/:id", reviewController_1.getAllReviews);
exports.ReviewRoutes = router;
