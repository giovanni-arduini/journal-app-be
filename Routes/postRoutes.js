import express from "express";
import {
  getSignedUrl,
  createPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/signed-url", getSignedUrl);
router.post("/", createPost);
router.put("/:id", updatePost);
router.get("/", getPosts);

export default router;
