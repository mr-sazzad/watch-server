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
exports.createCheckoutSessionController = void 0;
const stripeService_1 = require("./stripeService");
const createCheckoutSessionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartProducts = req.body;
        console.log(cartProducts, "products from cart");
        const sessionUrl = yield stripeService_1.stripeService.createCheckoutSession(cartProducts);
        console.log(sessionUrl, "session url");
        if (sessionUrl) {
            res.status(200).json({
                success: true,
                message: "",
                url: sessionUrl,
            });
        }
        else {
            throw new Error("Session URL is null or undefined.");
        }
    }
    catch (error) {
        console.error("Error in createCheckoutSessionController:", error);
        res.status(500).json({
            success: false,
            error: "An error occurred, please try again later.",
        });
    }
});
exports.createCheckoutSessionController = createCheckoutSessionController;
