import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getLatestBlogs,
  getSingleBlog,
  updateBlog,
} from "./blogController";

const router = Router();

router.post("/create-post", createBlog);

router.get("/", getAllBlogs);

router.get("/latest", getLatestBlogs);

router.get("/blog-id/:id", getSingleBlog);

router.patch("/:id", updateBlog);

router.delete("/:id", deleteBlog);

export const BlogRoutes = router;
