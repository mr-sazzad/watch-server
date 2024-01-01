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
exports.BlogService = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const createBlog = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.create({
        data,
    });
    if (!result) {
        throw new apiError_1.default(500, "Error creating blog");
    }
    return result;
});
const updateBlog = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.update({
        where: {
            id,
        },
        data,
    });
    if (!result) {
        throw new apiError_1.default(500, "Error updating blog");
    }
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.delete({
        where: {
            id,
        },
    });
    if (!result) {
        throw new apiError_1.default(500, "Internal Error");
    }
    return result;
});
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.findMany({});
    if (!result) {
        throw new apiError_1.default(500, "Internal Error");
    }
    return result;
});
const getLatestBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.findMany({
        orderBy: {
            id: "desc",
        },
        take: 3,
    });
    return result;
});
const getSingleBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.findUnique({
        where: {
            id: blogId,
        },
    });
    if (!result) {
        throw new apiError_1.default(500, "Internal server Error");
    }
    return result;
});
exports.BlogService = {
    getAllBlogs,
    deleteBlog,
    updateBlog,
    createBlog,
    getSingleBlog,
    getLatestBlogs,
};
