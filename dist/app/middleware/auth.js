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
const apiError_1 = __importDefault(require("../errors/apiError"));
const jwtHelpers_1 = require("../utils/jwtHelpers");
const SECRET = process.env.JWT_SECRET || "e-commerce";
const auth = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get authorization token
        const token = req.headers.authorization;
        if (!token) {
            throw new apiError_1.default(401, "You are not authorized");
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, SECRET);
        req.user = verifiedUser;
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new apiError_1.default(403, "Forbidden");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
