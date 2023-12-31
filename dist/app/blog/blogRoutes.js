"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const blogController_1 = require("./blogController");
const router = (0, express_1.Router)();
router.post("/create-post", blogController_1.createBlog);
router.get("/", blogController_1.getAllBlogs);
router.get("/latest", blogController_1.getLatestBlogs);
router.get("/blog-id/:id", blogController_1.getSingleBlog);
router.patch("/:id", blogController_1.updateBlog);
router.delete("/:id", blogController_1.deleteBlog);
exports.BlogRoutes = router;
