import connectDb from "@/utils/connectDb.js";
import QuizResult from "@/models/resultSchema.js";

connectDb();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const savedResult = new QuizResult({
      ...req.body,
    });
    const savedData = await savedResult.save().catch((err) => {
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
