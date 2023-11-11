import { User } from "@prisma/client";
import prisma from "../libs/prisma";
import bcrypt from "bcryptjs";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { jwtHelpers } from "../utils/jwtHelpers";
import { ICredentials, IDecodedUser, ITokens, userRole } from "../types";
import ApiError from "../errors/apiError";

const secret = process.env.JWT_SECRET;
const saltRounds = Number(process.env.SALT_ROUNDS);

const createUser = async (token: string, user: User): Promise<User | null> => {
  const email = user.email;

  if (user.role === userRole.super_admin) {
    throw new ApiError(401, "unauthorize access");
  }

  if (user.role === userRole.admin) {
    if (!token) {
      throw new ApiError(401, "unauthorize access");
    }

    const decodedUser = Jwt.decode(token) as JwtPayload;

    if (decodedUser?.role !== "SUPER_ADMIN") {
      throw new ApiError(401, "unauthorize access");
    }
  }

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new Error("User already exists");
  }

  user.password = await bcrypt.hash(user.password, saltRounds);

  const newUser = await prisma.user.create({
    data: user,
  });

  console.log(newUser, "new User");
  return newUser;
};

const loginUser = async (user: ICredentials): Promise<ITokens | null> => {
  const email = user.email;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  console.log(isUserExist);

  if (!isUserExist) {
    throw new Error("User does not exist");
  }

  if (isUserExist.isBanned) {
    throw new Error("This user id is already banned");
  }

  const isPasswordMatch = await bcrypt.compare(
    user.password,
    isUserExist?.password
  );

  if (!isPasswordMatch) {
    throw new Error("Password does not match");
  }

  const credentials = {
    id: isUserExist.id,
    email: isUserExist.email,
    name: isUserExist.name,
    role: isUserExist.role,
  };

  const accessToken = jwtHelpers.createToken(
    credentials,
    secret as string,
    "1d"
  );
  const refreshToken = jwtHelpers.createToken(
    credentials,
    secret as string,
    "365d"
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getAllUsers = async (): Promise<User[] | null> => {
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
  });

  if (!users.length) {
    return null;
  }

  return users;
};

const getAllAdmins = async (): Promise<User[] | null> => {
  const users = await prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
  });

  if (!users.length) {
    return null;
  }

  return users;
};

const getSingleUser = async (userId: string): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      Cart: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const updateUser = async (
  token: string,
  user: Partial<User>
): Promise<User | null> => {
  if (!token) {
    throw new Error("Token Not Provided");
  }

  const decodedToken = Jwt.decode(token) as JwtPayload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: decodedToken.id,
    },
  });

  if (!isUserExist) {
    throw new Error("User does not exist");
  }

  if (isUserExist.isBanned) {
    throw new Error("User is banned");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: decodedToken.id,
    },
    data: user,
  });

  return updatedUser;
};

const updateSingleUser = async (id: string, data: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  if (!result) {
    throw new ApiError(500, "Internal server error");
  }

  return result;
};

const banUser = async (token: string, userId: string): Promise<User | null> => {
  if (!token) {
    throw new Error("No token provided");
  }

  if (!userId) {
    throw new Error("No user id provided");
  }

  const banUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isBanned: true,
    },
  });

  return banUser;
};

export const userService = {
  createUser,
  loginUser,
  updateUser,
  banUser,
  getAllUsers,
  getAllAdmins,
  getSingleUser,
  updateSingleUser,
};
