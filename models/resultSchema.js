import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema(
  {
    quizId: {
      type: String,
      required: true,
    },
    name: {
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
        myAns: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const QuizResult =
  mongoose.models?.QuizResult || mongoose.model("QuizResult", quizResultSchema);

export default QuizResult;
