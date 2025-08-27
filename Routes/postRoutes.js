import express from "express";
import { getSignedUrl, createPost, getPosts } from "../controllers/postController.js";

const router = express.Router();

router.get("/signed-url", getSignedUrl);
router.post("/", createPost);
router.get("/", getPosts);

export default router;
