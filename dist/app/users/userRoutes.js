"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("./userController");
const types_1 = require("../types");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/signup", userController_1.createUser);
router.post("/login", userController_1.loginUser);
router.patch("/ban", (0, auth_1.default)(types_1.userRole.admin, types_1.userRole.super_admin), userController_1.banUser);
router.get("/", userController_1.getAllUsers);
router.get("/admin-user", (0, auth_1.default)(types_1.userRole.super_admin), userController_1.getAllAdmins);
router.get("/:id", userController_1.getSingleUser);
router.patch("/:id", userController_1.updateUser);
router.patch("/update/:id", userController_1.updateSingleUser); // auth(userRole.admin),
exports.UserRoutes = router;
