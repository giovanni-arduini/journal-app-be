import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  media: [
    {
      type: { type: String, enum: ["image", "video", "videoPreview"], required: true },
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
}, { timestamps: true });

export default mongoose.model("Post", postSchema);