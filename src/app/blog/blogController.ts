import { RequestHandler } from "express";
import { BlogService } from "./blogService";

export const createBlog: RequestHandler = async (req, res, next) => {
  try {
    const result = await BlogService.createBlog(req.body);

    res.status(201).json({
      status: 201,
      message: "Blog created successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateBlog: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BlogService.updateBlog(id, req.body);

    res.status(200).json({
      status: 200,
      message: "Blog updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteBlog: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BlogService.deleteBlog(id);

    res.status(200).json({
      status: 200,
      message: "Blog deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleBlog: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await BlogService.getSingleBlog(id);

    res.status(200).json({
      status: 200,
      message: "Blog retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllBlogs: RequestHandler = async (req, res, next) => {
  try {
    const result = await BlogService.getAllBlogs();

    res.status(200).json({
      status: 200,
      message: "Blogs retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getLatestBlogs: RequestHandler = async (req, res, next) => {
  try {
    const result = await BlogService.getLatestBlogs();

    res.status(200).json({
      status: 200,
      message: "Latest Blogs retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
