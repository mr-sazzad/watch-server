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
exports.cartService = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const addToCart = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.create({ data });
    return result;
});
const getAllFromCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findMany({
        where: {
            userId: id,
        },
        include: {
            product: true,
            buyer: true,
        },
    });
    return result;
});
const getSingleCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.findUnique({
        where: {
            id,
        },
        include: {
            buyer: true,
            product: true,
        },
    });
    return result;
});
const updateSingleCart = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteSingleCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cart.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.cartService = {
    addToCart,
    getAllFromCart,
    getSingleCart,
    deleteSingleCart,
    updateSingleCart,
};
