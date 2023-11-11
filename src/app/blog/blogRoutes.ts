import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} from "./blogController";

const router = Router();

router.post("/create-post", createBlog);

router.get("/", getAllBlogs);

router.patch("/:id", updateBlog);

router.delete("/:id", deleteBlog);

export const BlogRoutes = router;
