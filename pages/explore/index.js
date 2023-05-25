import Navbar from "@/components/Navbar";
import Card from "@/components/ExploreCard";
import mongoose from "mongoose";
import quizQuestionSchema from "@/models/quizSchema.js";
import connectDb from "@/utils/connectDb.js";

function NoQuizes() {
  return (
    <div className="h-full w-full relative">
      <div className="font-bold text-xl h-max w-[80%] bg-white p-3 absolute top-[30%] left-2/4 -translate-x-2/4 rounded-lg">
        Looks like there are no Quizes Available to Play now.
        <br />
        Please come again later
      </div>
    </div>
  );
}

export default function Explore({ quizes }) {
  return (
    <>
      <Navbar isExplore={false} />
      <main className="w-screen text-center min-h-screen max-h-max px-5 bg-gray-100 py-4">
        {quizes && quizes?.length >= 1 ? (
          quizes?.map((val, i) => <Card key={i} data={val} />)
        ) : (
          <NoQuizes />
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  await connectDb();
  const quiz = await quizQuestionSchema.find({}).lean();
  let quizes = JSON.parse(JSON.stringify(quiz));

  return {
    props: {
      quizes,
    },
  };
}
