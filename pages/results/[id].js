import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Finished from "@/components/Finished";
import getAvatar from "@/utils/avatar";
import BackBtn from "@/components/BackBtn";
import mongoose from "mongoose";
import QuizResult from "@/models/resultSchema.js";
import connectDb from "@/utils/connectDb.js";

function NoResults() {
  return (
    <>
      <Navbar />
      <main className="w-screen text-center min-h-screen max-h-max px-5 bg-gray-100 py-4">
        <div className="h-full w-full relative">
          <div className="font-bold text-xl h-max w-[80%] bg-white p-3 absolute top-[30%] left-2/4 -translate-x-2/4 rounded-lg">
            Looks like Results are not yet available on this Page.
            <br />
            Please come again later
          </div>
        </div>
      </main>
    </>
  );
}

function Results({ results }) {
  if (!results) return <NoResults />;

  const [hydrated, setHydrated] = useState(false);
  const [resultsArr, setResultsArr] = useState(results);
  const [dataToShow, setDataToShow] = useState(null);

  const sortAndSetResults = () => {
    let myObj = results;
    for (let i = 0; i < myObj.length; i++) {
      getAvatar(myObj[i].name).then((val) => (myObj[i].img = val));
      myObj[i].totalQs = myObj[i].questions.length;
      myObj[i].correctAns = 0;
      for (let j = 0; j < myObj[i].questions.length; j++) {
        if (myObj[i].questions[j].myAns == myObj[i].questions[j].answer) {
          myObj[i].correctAns++;
        }
      }
      myObj[i].percentage = Math.floor(
        (myObj[i].correctAns / myObj[i].totalQs) * 100
      );
    }
    myObj.sort((a, b) => b.percentage - a.percentage);
    setResultsArr(myObj);
  };

  useEffect(() => {
    sortAndSetResults();
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  if (dataToShow) {
    const { name, correctAns, totalQs, percentage, questions } = dataToShow;
    const scoreType = () => {
      let string = "";
      if (percentage >= 90) {
        string = "an amazing";
      } else if (percentage >= 80) {
        string = "a respectable";
      } else if (percentage >= 70) {
        string = "a nice";
      } else if (percentage >= 40) {
        string = "a good";
      } else if (percentage >= 30) {
        string = "not a bad";
      } else if (percentage >= 20) {
        string = "a bad";
      } else if (percentage >= 10) {
        string = "a worst";
      }
      return string;
    };

    const hideFinished = () => setDataToShow(null);

    return (
      <>
        <main className="text-center p-5 bg-gray-100 py-10 w-full h-auto min-h-screen max-h-max relative">
          <div className="absolute top-3 left-4">
            <BackBtn onclick={() => hideFinished()} />
          </div>
          <Finished
            title={`${name}'s Result`}
            cardText={`${name} performed well on the quiz, answering ${correctAns} out of ${totalQs} questions correctly. This results in a success rate of ${percentage}%, which is ${scoreType()} score.`}
            cardImg={"grinning-face-with-smiling-eyes"}
            showLink={false}
            linkHref={`/`}
            linkText={""}
            quizContainerTitle={`Here's how ${name} has Performed: `}
            quizContainerArray={questions}
          />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main
        className="w-full text-center p-5 bg-gray-100 py-10"
        style={{
          minHeight: "100vh",
          height: "auto",
          maxHeight: "max-content",
        }}
      >
        <table className="text-sm text-left w-full max-w-xl table-auto mx-auto rounded-lg bg-white shadow-lg">
          <thead className="text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-center">Sl No.</th>
              <th className="px-6 py-3 text-center">User</th>
              <th className="px-6 py-3 text-center">Score</th>
            </tr>
          </thead>
          <tbody>
            {resultsArr?.map((val, i) => {
              return (
                <tr
                  key={i}
                  className="border-t cursor-pointer hover:bg-blue-400 hover:text-white"
                  onClick={() => setDataToShow(val)}
                >
                  <td className="text-center py-4">{i + 1}</td>
                  <th className="px-2 text-start py-4 font-medium">
                    <img
                      className="rounded-full inline-block mr-3"
                      src={val?.img}
                      height="40"
                      width="40"
                    />
                    {val?.name}
                  </th>
                  <td className="px-6 text-center py-4">{val?.percentage}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default Results;

export async function getServerSideProps(context) {
  const { params } = context;
  await connectDb();
  const data = await QuizResult.find({ quizId: params.id }).lean();
  let results = JSON.parse(JSON.stringify(data));
  return {
    props: {
      results,
    },
  };
}
