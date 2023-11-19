import { WatchReview } from "@prisma/client";
import prisma from "../libs/prisma";
import ApiError from "../errors/apiError";

const createAReview = async (data: WatchReview): Promise<WatchReview> => {
  const userId = data.userId;
  const isUserExist = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!isUserExist) {
    throw new ApiError(403, "Unauthorized For Review");
  }

  if (isUserExist.role !== "user") {
    throw new ApiError(403, "Only user can review");
  }

  const result = await prisma.watchReview.create({
    data,
  });

  return result;
};

const getAllReviews = async (productId: string): Promise<WatchReview[]> => {
  const result = await prisma.watchReview.findMany({
    where: {
      watchId: productId,
    },
  });

  return result;
};

export const ReviewsServices = {
  createAReview,
  getAllReviews,
};
