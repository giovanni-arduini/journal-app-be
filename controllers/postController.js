import Post from "../models/Post.js";
import { generateSignedUrl } from "../services/gcsService.js";

// GET signed URL
export const getSignedUrl = async (req, res) => {
  try {
    const { filename, contentType } = req.query;
    const { uploadUrl, publicUrl } = await generateSignedUrl(
      filename,
      contentType
    );
    res.json({ uploadUrl, publicUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore generazione signed URL" });
  }
};

// POST nuovo post

export const createPost = async (req, res) => {
  try {
    let posts;

    const post = new Post(req.body);
    posts = await post.save();

    res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore salvataggio post" });
  }
};

// GET tutti i post
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Errore recupero post" });
  }
};

// UPDATE singolo post
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updateData = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post non trovato" });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore aggiornamento post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post non trovato" });
    }
    res.json({ message: "Post eliminato", post: deletedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore eliminazione post" });
  }
};
