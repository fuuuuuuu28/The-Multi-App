import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
      clerkId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("todo", todoSchema);
