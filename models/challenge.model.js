import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  keywords: [
    {
      type: String,
    },
  ],
  problemStatement: {
    type: String,
    required: true,
  },
  files: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Challenge = mongoose.model("Challenge", challengeSchema);
