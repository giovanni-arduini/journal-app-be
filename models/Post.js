import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    // id viene generato automaticamente da MongoDB
    name: { type: String, required: true },
    media: {
      type: [
        {
          type: {
            type: String,
            enum: ["photo", "video", "image"],
            required: true,
          },
          url: { type: String, required: true },
          videoPreview: String,
        },
      ],
      required: true,
    },
    location: {
      manual: String,
      geo: {
        lat: Number,
        lng: Number,
      },
    },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    mood: { type: String, required: true },
    positive_reflection: String,
    negative_reflection: String,
    physical_effort: { type: Number, required: true },
    economic_effort: { type: Number, required: true },
    actual_expense: { type: Number, required: true },
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
