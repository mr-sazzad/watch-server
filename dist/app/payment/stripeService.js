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
exports.stripeService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const stripe = new stripe_1.default("sk_test_51O7I6YSHcqDbqznpDeLVhjkm8daLBzB8UiImRJowGCFLzK8WBj3R2CbT1HlK8SZr9zmVWMET9Xua9PPMX1m4LwMw00j9tQGxQg");
const YOUR_DOMAIN = process.env.DOMAIN;
const createCheckoutSession = (cartProducts) => __awaiter(void 0, void 0, void 0, function* () {
    // const lineItems = cartProducts.map((singleCart: any) => ({
    //   price_data: {
    //     currency: "usd",
    //     product_data: {
    //       name: singleCart.product.title,
    //     },
    //     unit_amount: singleCart.product.price * 100,
    //   },
    //   quantity: singleCart.quantity,
    // }));
    const session = yield stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: cartProducts.product.title,
                    },
                    unit_amount: cartProducts.product.price * 100,
                },
                quantity: cartProducts.quantity,
            },
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/payment/success`,
        cancel_url: `${YOUR_DOMAIN}/payment/cancel`,
    });
    if (!session.url) {
        throw new apiError_1.default(501, "Session URL is null or undefined.");
    }
    else {
        return session.url;
    }
});
exports.stripeService = {
    createCheckoutSession,
};
