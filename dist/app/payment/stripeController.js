"use strict";
// Controller file
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
exports.getAllPayments = exports.handlePaymentSuccess = exports.createCheckoutSessionController = void 0;
const stripeService_1 = require("./stripeService");
const createCheckoutSessionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartProducts = req.body;
        const session = yield stripeService_1.stripeService.createCheckoutSession(cartProducts);
        if (session) {
            res.status(200).json({
                success: true,
                message: "Payment Created",
                data: session,
            });
        }
        else {
            throw new Error("Session URL is null or undefined.");
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred, please try again later",
        });
    }
});
exports.createCheckoutSessionController = createCheckoutSessionController;
const handlePaymentSuccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id, "session id from controller");
        const result = yield stripeService_1.stripeService.handlePaymentSuccess(id);
        res.status(200).json({
            success: true,
            message: "Payment Updated",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: "Error Occurred Updating Status",
        });
    }
});
exports.handlePaymentSuccess = handlePaymentSuccess;
const getAllPayments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield stripeService_1.stripeService.getAllPayments(id);
        res.status(200).json({
            success: true,
            message: "Payments Retrieved",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: "Error Occurred Getting All Payment",
        });
    }
});
exports.getAllPayments = getAllPayments;
