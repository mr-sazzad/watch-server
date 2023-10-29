import { RequestHandler } from "express";
import { cartService } from "./cartService";

export const addToCart: RequestHandler = async (req, res, next) => {
  try {
    const cartData = req.body;
    const result = await cartService.addToCart(cartData);

    res.status(201).json({
      status: 201,
      message: "Watch added successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllFromCart: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const result = await cartService.getAllFromCart(userId);

    res.status(200).json({
      status: 200,
      message: "Watch fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleCart: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await cartService.getSingleCart(id);

    res.status(200).json({
      status: 200,
      message: "Watch fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleCart: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const result = await cartService.updateSingleCart(id, data);

    res.status(200).json({
      status: 200,
      message: "Watch updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleCart: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await cartService.deleteSingleCart(id);

    res.status(200).json({
      status: 200,
      message: "Watch deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
