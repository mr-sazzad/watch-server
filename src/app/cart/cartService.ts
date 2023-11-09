import { Cart } from "@prisma/client";
import prisma from "../libs/prisma";

const addToCart = async (data: Cart): Promise<Cart | null> => {
  const result = await prisma.cart.create({ data });

  return result;
};

const getAllFromCart = async (id: string): Promise<Cart[] | null> => {
  const result = await prisma.cart.findMany({
    where: {
      userId: id,
    },
    include: {
      product: true,
      buyer: true,
    },
  });

  return result;
};

const getSingleCart = async (id: string): Promise<Cart | null> => {
  const result = await prisma.cart.findUnique({
    where: {
      id,
    },
    include: {
      buyer: true,
      product: true,
    },
  });
  return result;
};

const updateSingleCart = async (
  id: string,
  data: Partial<Cart>
): Promise<Cart | null> => {
  const result = await prisma.cart.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteSingleCart = async (id: string): Promise<Cart | null> => {
  const result = await prisma.cart.delete({
    where: {
      id,
    },
  });
  return result;
};

export const cartService = {
  addToCart,
  getAllFromCart,
  getSingleCart,
  deleteSingleCart,
  updateSingleCart,
};
