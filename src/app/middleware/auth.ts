import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import ApiError from "../errors/apiError";
import { jwtHelpers } from "../utils/jwtHelpers";


const SECRET = process.env.JWT_SECRET || "programming-hero";

declare module "express-serve-static-core" {
  interface Request {
    user: {};
  }
}

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(401, "You are not authorized");
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, SECRET as Secret);

      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(403, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;