import { Blog } from "@prisma/client";
import prisma from "../libs/prisma";
import ApiError from "../errors/apiError";

const createBlog = async (data: Blog) => {
  const result = await prisma.blog.create({
    data,
  });

  if (!result) {
    throw new ApiError(500, "Error creating blog");
  }

  return result;
};

const updateBlog = async (id: string, data: Partial<Blog>) => {
  const result = await prisma.blog.update({
    where: {
      id,
    },
    data,
  });

  if (!result) {
    throw new ApiError(500, "Error updating blog");
  }

  return result;
};

const deleteBlog = async (id: string) => {
  const result = await prisma.blog.delete({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(500, "Internal Error");
  }

  return result;
};

const getAllBlogs = async () => {
  const result = await prisma.blog.findMany({});

  if (!result) {
    throw new ApiError(500, "Internal Error");
  }

  return result;
};

const getLatestBlogs = async () => {
  const result = await prisma.blog.findMany({
    orderBy: {
      id: "desc",
    },
    take: 3,
  });

  return result;
};

const getSingleBlog = async (blogId: string) => {
  const result = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  if (!result) {
    throw new ApiError(500, "Internal server Error");
  }

  return result;
};

export const BlogService = {
  getAllBlogs,
  deleteBlog,
  updateBlog,
  createBlog,
  getSingleBlog,
  getLatestBlogs,
};
