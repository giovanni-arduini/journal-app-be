import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import postRoutes from "./Routes/postRoutes.js"
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connessione DB
connectDB();

// Routes
const PORT = 3000;
app.use(`/api/posts`, postRoutes);

app.listen(PORT, () => console.log(`✅ Server avviato su http://localhost:${PORT}`));
