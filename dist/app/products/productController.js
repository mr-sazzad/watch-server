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
exports.deleteWatch = exports.updateWatch = exports.getSingleWatch = exports.getAllWatches = exports.createWatch = void 0;
const productService_1 = require("./productService");
const createWatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const watch = req.body;
        const result = yield productService_1.watchService.createWatch(watch);
        res.status(201).json({
            status: 201,
            message: "Watch created successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createWatch = createWatch;
const getAllWatches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield productService_1.watchService.getAllWatches();
        res.status(200).json({
            status: 200,
            message: "Watches fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllWatches = getAllWatches;
const getSingleWatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield productService_1.watchService.getSingleWatch(id);
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
exports.getSingleWatch = getSingleWatch;
const updateWatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const watch = req.body;
        const result = yield productService_1.watchService.updateWatch(id, watch);
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
exports.updateWatch = updateWatch;
const deleteWatch = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield productService_1.watchService.deleteWatch(id);
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
exports.deleteWatch = deleteWatch;
