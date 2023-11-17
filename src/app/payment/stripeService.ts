import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import ApiError from "../errors/apiError";

const prisma = new PrismaClient();
const stripe = new Stripe(
  "sk_test_51O7I6YSHcqDbqznpDeLVhjkm8daLBzB8UiImRJowGCFLzK8WBj3R2CbT1HlK8SZr9zmVWMET9Xua9PPMX1m4LwMw00j9tQGxQg"
); // Your Stripe secret key
const DOMAIN = process.env.DOMAIN;

const createCheckoutSession = async (cartProducts: any) => {
  try {
    const lineItems = cartProducts.map((singleCart: any) => {
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${DOMAIN}/payment/success`,
      cancel_url: `${DOMAIN}/payment/cancel`,
    });

    if (!session.url) {
      throw new ApiError(501, "Session URL is null or undefined.");
    }

    console.log("Created Stripe Checkout Session:", session);

    const productIds = cartProducts.map((cart: any) => cart.id);
    const payment = await prisma.payment.createMany({
      data: productIds.map((cartId: string) => ({
        cartId: cartId,
        session: session.id,
      })),
    });

    console.log(payment, "payment");

    return {
      sessionId: session.id,
      sessionUrl: session.url,
    };
  } catch (error: any) {
    console.error("Error creating checkout session:", error.message);
    throw new ApiError(500, "Error creating checkout session.");
  }
};

const getAllRecentPayments = async (take: number) => {
  const result = await prisma.payment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: take,
    include: {
      cart: true,
    },
  });

  return result;
};

const getAllPayments = async () => {
  const result = await prisma.payment.findMany({
    include: {
      cart: true,
    },
  });

  return result;
};

// handle payment success service
const handlePaymentSuccess = async (sessionId: string) => {
  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (stripeSession.payment_status === "paid") {
      await prisma.payment.updateMany({
        where: { session: sessionId },
        data: { status: "Paid" },
      });
    }

    console.log("Payment status updated successfully.");
  } catch (error: any) {
    console.error("Error handling payment success:", error.message);
    throw new ApiError(500, "internal server error");
  }
};

export const stripeService = {
  createCheckoutSession,
  handlePaymentSuccess,
  getAllRecentPayments,
  getAllPayments,
};
