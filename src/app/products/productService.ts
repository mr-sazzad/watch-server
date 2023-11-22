import { Watch } from "@prisma/client";
import prisma from "../libs/prisma";

const createWatch = async (data: Watch): Promise<Watch | null> => {
  const result = await prisma.watch.create({
    data,
  });

  return result;
};

const getAllRecentWatches = async (): Promise<Watch[] | null> => {
  const result = await prisma.watch.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return result;
};

const getAllWatches = async (): Promise<Watch[] | null> => {
  const result = await prisma.watch.findMany({
    where: {
      status: { not: "Upcoming" },
    },
  });

  return result;
};

const getAllUpcomingWatches = async (): Promise<Watch[] | null> => {
  const result = await prisma.watch.findMany({
    where: {
      status: "Upcoming",
    },
  });

  return result;
};

const getSingleWatch = async (id: string): Promise<Watch | null> => {
  const result = await prisma.watch.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateWatch = async (
  id: string,
  data: Partial<Watch>
): Promise<Watch | null> => {
  const result = await prisma.watch.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteWatch = async (id: string): Promise<Watch | null> => {
  const result = await prisma.watch.delete({
    where: {
      id,
    },
  });

  return result;
};

export const watchService = {
  createWatch,
  getAllWatches,
  updateWatch,
  deleteWatch,
  getSingleWatch,
  getAllUpcomingWatches,
  getAllRecentWatches,
};
