import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    timer: {
      type: Boolean,
      required: true,
    },
    timing: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    quizId: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },
      },
    ],
    createdAt: {
      type: String,
      default: Date.now().toString(),
    },
    expiresAt: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const quizQuestionSchema = mongoose.models?.Question || mongoose.model("Question", quizSchema);

export default quizQuestionSchema;
