import express from "express";
import {
  getSignedUrl,
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/signed-url", getSignedUrl);
router.post("/", createPost);
router.put("/:id", updatePost);
router.get("/", getPosts);
router.delete("/:id", deletePost);

export default router;
