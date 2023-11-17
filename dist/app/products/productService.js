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
exports.watchService = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const createWatch = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.watch.create({
        data,
    });
    return result;
});
const getAllWatches = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.watch.findMany();
    return result;
});
const getSingleWatch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.watch.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateWatch = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.watch.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const deleteWatch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.watch.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.watchService = {
    createWatch,
    getAllWatches,
    updateWatch,
    deleteWatch,
    getSingleWatch,
};
