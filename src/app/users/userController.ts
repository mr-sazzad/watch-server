import { RequestHandler } from "express";
import { userService } from "./userService";
import { ITokens } from "../types";

const node_env = process.env.NODE_ENV;

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body;
    const token = req.headers.authorization as string;

    const result = await userService.createUser(token, userData);

    res.status(201).json({
      success: true,
      status: 201,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const loginData = req.body;
    const result: ITokens | null = await userService.loginUser(loginData);

    const refreshToken = result?.refreshToken;

    const cookieOptions = {
      secure: node_env === "production",
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({
      success: true,
      status: 201,
      message: "User logged-in successfully",
      data: result?.accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body, "userData");
    const userData = req.body;
    const token = req.headers.authorization as string;
    const result = await userService.updateUser(token, userData);

    res.status(201).json({
      success: true,
      status: 201,
      message: "User updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const banUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const token = req.headers.authorization as string;

    const result = await userService.banUser(token, userId);

    res.status(201).json({
      success: true,
      status: 201,
      message: "User banned successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await userService.getSingleUser(userId);

    res.status(200).json({
      success: true,
      status: 200,
      message: "User fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
