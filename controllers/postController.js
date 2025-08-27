import Post from "../models/Post.js";
import { generateSignedUrl } from "../services/gcsService.js";

// GET signed URL
export const getSignedUrl = async (req, res) => {
  try {
    const { filename, contentType } = req.query;
    const { uploadUrl, publicUrl } = await generateSignedUrl(filename, contentType);
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
    if (Array.isArray(req.body)) {
      // se è un array, crea più documenti
      posts = await Post.insertMany(req.body);
    } else {
      // se è un singolo oggetto
      const post = new Post(req.body);
      posts = await post.save();
    }
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
