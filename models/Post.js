import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  id: Number,
  name: String,
  media: [
    {
      type: { type: String, enum: ["photo", "video"], required: true },
      url: String,
      videoPreview: String
    }
  ],
  location: {
    manual: String,
    geo: {
      lat: Number,
      lng: Number
    }
  },
  description: String,
  mood: String,
  positive_reflection: String,
  negative_reflection: String,
  physical_effort: Number,
  economic_effort: Number,
  actual_expense: Number,
  tags: [String]
}, { timestamps: true });

export default mongoose.model("Post", postSchema);