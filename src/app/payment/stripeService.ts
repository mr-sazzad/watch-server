import Stripe from "stripe";
import ApiError from "../errors/apiError";
import prisma from "../libs/prisma";

const stripe = new Stripe(
  "sk_test_51O7I6YSHcqDbqznpDeLVhjkm8daLBzB8UiImRJowGCFLzK8WBj3R2CbT1HlK8SZr9zmVWMET9Xua9PPMX1m4LwMw00j9tQGxQg"
);
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

    // create payment ⚡
    const payment = await prisma.payment.createMany({
      data: cartProducts.map((cart: any) => ({
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
  } catch (error: any) {
    console.error("Error creating checkout session:", error.message);
    throw new ApiError(500, "Error creating checkout session.");
  }
};

const getAllPayments = async (userId: string) => {
  const result = await prisma.payment.findMany({
    where: {
      userId: userId,
    },
    include: {
      product: true,
      user: true,
    },
  });
  return result;
};

// handle payment success service
const handlePaymentSuccess = async (sessionId: string) => {
  console.log(sessionId, "sessionId");
  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (stripeSession.payment_status === "paid") {
      await prisma.payment.updateMany({
        where: { session: sessionId },
        data: { status: "Paid" },
      });
    }
  } catch (error: any) {
    console.error("Error handling payment success:", error.message);
    throw new ApiError(500, "internal server error");
  }
};

export const stripeService = {
  createCheckoutSession,
  handlePaymentSuccess,
  getAllPayments,
};
