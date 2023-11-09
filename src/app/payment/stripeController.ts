// Controller file

import { Request, Response } from "express";
import { stripeService } from "./stripeService";

export const createCheckoutSessionController = async (
  req: Request,
  res: Response
) => {
  try {
    const cartProducts = req.body;
    console.log(cartProducts, "products from cart");
    const sessionUrl = await stripeService.createCheckoutSession(cartProducts);
    console.log(sessionUrl, "session url");
    if (sessionUrl) {
      res.status(200).json({
        success: true,
        message: "",
        url: sessionUrl,
      });
    } else {
      throw new Error("Session URL is null or undefined.");
    }
  } catch (error) {
    console.error("Error in createCheckoutSessionController:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred, please try again later.",
    });
  }
};
