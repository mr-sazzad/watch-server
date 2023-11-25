"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchRoutes = void 0;
const express_1 = require("express");
const productController_1 = require("./productController");
const auth_1 = __importDefault(require("../middleware/auth"));
const types_1 = require("../types");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(types_1.userRole.admin, types_1.userRole.super_admin), productController_1.createWatch);
router.get("/", productController_1.getAllWatches);
router.get("/recent", productController_1.getAllRecentWatches);
router.get("/upcoming", productController_1.getAllUpcomingWatches);
router.get("/:id", productController_1.getSingleWatch);
router.patch("/:id", productController_1.updateWatch);
router.delete("/:id", (0, auth_1.default)(types_1.userRole.admin, types_1.userRole.super_admin), productController_1.deleteWatch);
exports.WatchRoutes = router;
