import { useState, useLayoutEffect, useContext } from "react";
import MyQuestionsContext from "@/context/Questions";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Finished from "@/components/Finished";

export default function Created() {
  const { resData, showEnterQuestions } = useContext(MyQuestionsContext);
  const router = useRouter();

  useLayoutEffect(() => {
    if (!resData) {
      router.push("/create-quiz");
    }
    if (resData?.title.trim() == "") {
      router.push("/create-quiz");
    } else if (resData?.questions.length < 3) {
      router.push("/create-quiz/add-questions");
      showEnterQuestions();
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="text-center p-5 bg-gray-100 py-10 w-full h-auto min-h-screen max-h-max ">
        <Finished
          title="Congratulations !!"
          cardText={
            <CardPara
              title={resData?.title}
              days={resData?.days}
              quizId={resData?.quizId}
            />
          }
          cardImg={"partying-face"}
          showLink={true}
          linkHref={`/quiz/${resData?.quizId}`}
          linkText={"Play Your Quiz"}
          quizContainerTitle="Your Quiz Q/A:"
          quizContainerArray={resData?.questions}
          celebration={true}
        />
      </main>
    </>
  );
}

function CardPara({ title, days, quizId }) {
  const [hrefLocation, setHref] = useState("");

  useLayoutEffect(() => {
    setHref(location.origin);
  }, []);

  return (
    <span>
      Great job! You have successfully created a quiz titled{" "}
      <strong>"{title}"</strong>. This quiz will remain active for the next{" "}
      {days} days. Now, it's time to share the URL of your quiz with others so
      they can join and enjoy playing. Let the fun begin! Share the URL below:{" "}
      <br />
      <Link href={`/quiz/${quizId}`} className="break-words">
        {hrefLocation}/quiz/{quizId}
      </Link>
    </span>
  );
}
