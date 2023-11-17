// Controller file

import { Request, RequestHandler, Response } from "express";
import { stripeService } from "./stripeService";

export const createCheckoutSessionController = async (
  req: Request,
  res: Response
) => {
  try {
    const cartProducts = req.body;
    const { sessionUrl } = await stripeService.createCheckoutSession(
      cartProducts
    );
    if (sessionUrl) {
      res.status(200).json({
        success: true,
        message: "Payment Created",
        data: sessionUrl,
      });
    } else {
      throw new Error("Session URL is null or undefined.");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred, please try again later.",
    });
  }
};

export const handlePaymentSuccess: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await stripeService.handlePaymentSuccess(id);

    res.status(200).json({
      success: true,
      message: "Payment Updated",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Error Occurred Updating Status",
    });
  }
};

export const getAllPayments: RequestHandler = async (req, res, next) => {
  try {
    const result = await stripeService.getAllPayments();

    res.status(200).json({
      success: true,
      message: "Payments Retrieved",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Error Occurred Getting All Payment",
    });
  }
};

export const getAllRecentPayments: RequestHandler = async (req, res, next) => {
  try {
    const limit = req.body;
    const result = await stripeService.getAllRecentPayments(limit);

    res.status(200).json({
      success: true,
      message: "Recent Payments Retrieved",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: "Error Occurred Getting Recent Payments",
    });
  }
};
