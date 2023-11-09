import Stripe from "stripe";
import ApiError from "../errors/apiError";

const stripe = new Stripe(
  "sk_test_51O7I6YSHcqDbqznpDeLVhjkm8daLBzB8UiImRJowGCFLzK8WBj3R2CbT1HlK8SZr9zmVWMET9Xua9PPMX1m4LwMw00j9tQGxQg"
);

const YOUR_DOMAIN = process.env.DOMAIN;

const createCheckoutSession = async (cartProducts: any) => {
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
  const session = await stripe.checkout.sessions.create({
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
    throw new ApiError(501, "Session URL is null or undefined.");
  } else {
    return session.url;
  }
};

export const stripeService = {
  createCheckoutSession,
};
