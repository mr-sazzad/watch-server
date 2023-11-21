import { Wishlist } from "@prisma/client";
import prisma from "../libs/prisma";
import ApiError from "../errors/apiError";

const addToWishlist = async (data: Wishlist): Promise<Wishlist | null> => {
  const result = await prisma.wishlist.create({ data });

  return result;
};

const getAllWishlists = async (userId: string): Promise<Wishlist[] | null> => {
  const result = await prisma.wishlist.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      watch: true,
    },
  });

  if (!result) {
    throw new ApiError(500, "something went wrong");
  }

  return result;
};

const deleteSingleWishlist = async (wishlistId: string) => {
  const result = await prisma.wishlist.delete({
    where: {
      id: wishlistId,
    },
  });

  return result;
};

const deleteAllWishlists = async (userId: string) => {
  const result = await prisma.wishlist.deleteMany({
    where: {
      userId,
    },
  });

  return result;
};

export const wishlistService = {
  addToWishlist,
  getAllWishlists,
  deleteSingleWishlist,
  deleteAllWishlists,
};
