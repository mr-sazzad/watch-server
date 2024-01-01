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
exports.getLatestBlogs = exports.getAllBlogs = exports.getSingleBlog = exports.deleteBlog = exports.updateBlog = exports.createBlog = void 0;
const blogService_1 = require("./blogService");
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield blogService_1.BlogService.createBlog(req.body);
        res.status(201).json({
            status: 201,
            message: "Blog created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createBlog = createBlog;
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield blogService_1.BlogService.updateBlog(id, req.body);
        res.status(200).json({
            status: 200,
            message: "Blog updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield blogService_1.BlogService.deleteBlog(id);
        res.status(200).json({
            status: 200,
            message: "Blog deleted successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteBlog = deleteBlog;
const getSingleBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield blogService_1.BlogService.getSingleBlog(id);
        res.status(200).json({
            status: 200,
            message: "Blog retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleBlog = getSingleBlog;
const getAllBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield blogService_1.BlogService.getAllBlogs();
        res.status(200).json({
            status: 200,
            message: "Blogs retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllBlogs = getAllBlogs;
const getLatestBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield blogService_1.BlogService.getLatestBlogs();
        res.status(200).json({
            status: 200,
            message: "Latest Blogs retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getLatestBlogs = getLatestBlogs;
