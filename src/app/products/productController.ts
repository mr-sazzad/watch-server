import { RequestHandler } from "express";
import { watchService } from "./productService";

export const createWatch: RequestHandler = async (req, res, next) => {
  try {
    const watch = req.body;
    const result = await watchService.createWatch(watch);

    res.status(201).json({
      status: 201,
      message: "Watch created successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllWatches: RequestHandler = async (req, res, next) => {
  try {
    const result = await watchService.getAllWatches();

    res.status(200).json({
      status: 200,
      message: "Watches fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleWatch: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await watchService.getSingleWatch(id);

    res.status(200).json({
      status: 200,
      message: "Watch fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateWatch: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const watch = req.body;

    const result = await watchService.updateWatch(id, watch);

    res.status(200).json({
      status: 200,
      message: "Watch updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteWatch: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await watchService.deleteWatch(id);

    res.status(200).json({
      status: 200,
      message: "Watch deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
