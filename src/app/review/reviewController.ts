import { RequestHandler } from "express";
import { ReviewsServices } from "./reviewServices";

export const createAReview: RequestHandler = async (req, res, next) => {
  const data = req.body;

  try {
    const result = await ReviewsServices.createAReview(data);

    res.status(201).json({
      status: 201,
      message: "Review Created",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllReviews: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ReviewsServices.getAllReviews(id);

    res.status(200).json({
      status: 200,
      message: "Review retrieved",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
