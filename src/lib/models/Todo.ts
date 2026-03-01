import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: { type: String, required: true }, // প্রতিটি todo user specific
  },

  { timestamps: true },
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
