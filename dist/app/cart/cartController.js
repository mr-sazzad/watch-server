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
exports.deleteSingleCart = exports.updateSingleCart = exports.getSingleCart = exports.getAllFromCart = exports.addToCart = void 0;
const cartService_1 = require("./cartService");
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartData = req.body;
        const result = yield cartService_1.cartService.addToCart(cartData);
        res.status(201).json({
            status: 201,
            message: "Watch added successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.addToCart = addToCart;
const getAllFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const result = yield cartService_1.cartService.getAllFromCart(userId);
        res.status(200).json({
            status: 200,
            message: "Watch fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllFromCart = getAllFromCart;
const getSingleCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield cartService_1.cartService.getSingleCart(id);
        res.status(200).json({
            status: 200,
            message: "Watch fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSingleCart = getSingleCart;
const updateSingleCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = yield cartService_1.cartService.updateSingleCart(id, data);
        res.status(200).json({
            status: 200,
            message: "Watch updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateSingleCart = updateSingleCart;
const deleteSingleCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield cartService_1.cartService.deleteSingleCart(id);
        res.status(200).json({
            status: 200,
            message: "Watch deleted successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteSingleCart = deleteSingleCart;
