import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Storage } from "@google-cloud/storage";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Connessione a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/posts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 🔹 Schema post
const postSchema = new mongoose.Schema({
  media: [
    {
      type: { type: String, enum: ["image", "video"], required: true },
      url: { type: String, required: true },
    },
  ],
  location: {
    name: String,
    coordinates: { lat: Number, lng: Number },
  },
  description: String,
  mood: String,
  positive_reflection: String,
  negative_reflection: String,
  physical_effort: Number,
  economic_effort: Number,
  actual_expense: Number,
  tags: [String],
});

const post = mongoose.model("post", postSchema);

// 🔹 Google Cloud Storage setup
const storage = new Storage({ keyFilename: "gcs-key.json" });
const bucket = storage.bucket("nome-del-tuo-bucket");

// Endpoint: genera Signed URL
app.get("/api/signed-url", async (req, res) => {
  try {
    const { filename, contentType } = req.query;
    const file = bucket.file(`${Date.now()}-${filename}`);

    const [uploadUrl] = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 5 * 60 * 1000, // 5 minuti
      contentType,
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    res.json({ uploadUrl, publicUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Errore generazione Signed URL");
  }
});

// Endpoint: salva esperienza
app.post("/api/post", async (req, res) => {
  try {
    const exp = new post(req.body);
    await exp.save();
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: "Errore salvataggio esperienza" });
  }
});

app.listen(3000, () => console.log("✅ Server avviato su http://localhost:3000"));
