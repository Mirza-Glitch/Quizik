import connectDb from "@/utils/connectDb.js";
import quizQuestionSchema from "@/models/quizSchema.js";

connectDb();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const getExpiryDay = () => {
      let day = new Date();
      day.setDate(day.getDate() + req.body.days);
      return day.toString();
    };
    const quizQuestion = new quizQuestionSchema({
      ...req.body,
      expiresAt: getExpiryDay(),
    });
    const savedData = await quizQuestion.save().catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      });
    });
    return res.status(200).json({ success: true, data: savedData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
