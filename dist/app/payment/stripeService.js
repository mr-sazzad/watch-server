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
const prisma_1 = __importDefault(require("../libs/prisma"));
const stripe = new stripe_1.default("sk_test_51O7I6YSHcqDbqznpDeLVhjkm8daLBzB8UiImRJowGCFLzK8WBj3R2CbT1HlK8SZr9zmVWMET9Xua9PPMX1m4LwMw00j9tQGxQg"); // Your Stripe secret key
const DOMAIN = process.env.DOMAIN;
const createCheckoutSession = (cartProducts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lineItems = cartProducts.map((singleCart) => {
            const limitedDescription = singleCart.product.desc.slice(0, 30);
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: singleCart.product.title,
                        images: [singleCart.product.image],
                        description: limitedDescription,
                        metadata: {
                            id: singleCart.id,
                        },
                    },
                    unit_amount: singleCart.product.price * 100,
                },
                quantity: singleCart.quantity,
            };
        });
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${DOMAIN}/payment/success`,
            cancel_url: `${DOMAIN}/payment/cancel`,
        });
        if (!session.url) {
            throw new apiError_1.default(501, "Session URL is null or undefined.");
        }
        // create payment ⚡
        const payment = yield prisma_1.default.payment.createMany({
            data: cartProducts.map((cart) => ({
                userId: cart.userId,
                productId: cart.watchId,
                session: session.id,
                cartId: cart.id,
            })),
        });
        return {
            sessionId: session.id,
            sessionUrl: session.url,
        };
    }
    catch (error) {
        console.error("Error creating checkout session:", error.message);
        throw new apiError_1.default(500, "Error creating checkout session.");
    }
});
const getAllPayments = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.payment.findMany({
        where: {
            userId: userId,
        },
        include: {
            product: true,
            user: true,
        },
    });
    return result;
});
// handle payment success service
const handlePaymentSuccess = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(sessionId, "sessionId");
    try {
        const stripeSession = yield stripe.checkout.sessions.retrieve(sessionId);
        if (stripeSession.payment_status === "paid") {
            yield prisma_1.default.payment.updateMany({
                where: { session: sessionId },
                data: { status: "Paid" },
            });
        }
    }
    catch (error) {
        console.error("Error handling payment success:", error.message);
        throw new apiError_1.default(500, "internal server error");
    }
});
exports.stripeService = {
    createCheckoutSession,
    handlePaymentSuccess,
    getAllPayments,
};
