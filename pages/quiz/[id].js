import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import MyDataContext from "@/context/MyData";
import MyAnswersContext from "@/context/Answers";
import Quiz from "@/components/Quiz";
import ModalJoinQuiz from "@/components/ModalJoinQuiz";
import Navbar from "@/components/Navbar";
import Finished from "@/components/Finished";
import mongoose from "mongoose";
import quizQuestionSchema from "@/models/quizSchema.js";
import connectDb from "@/utils/connectDb.js";

function MetaTags({ title, desc }) {
  return (
    <Head>
      <title>{title} | quizik </title>
      <meta property="title" content={title} key="title" />
      <meta property="description" content={desc} />
      <meta property="og:title" content={title} key="title" />
      <meta property="og:description" content={desc} />
      <meta property="url" content={location.href} key="title" />
    </Head>
  );
}

function NoQuizData({ title, desc }) {
  return (
    <>
      <Navbar />
      <main className="text-center p-5 bg-gray-100 py-10 w-full h-auto min-h-screen max-h-max ">
        <Finished
          title={title}
          cardText={desc}
          cardImg={"face-with-monocle"}
          showLink={true}
          linkHref={`/create-quiz`}
          linkText={"Create Quiz"}
          quizContainerTitle=""
          quizContainerArray={[]}
        />
      </main>
    </>
  );
}

export default function StartQuiz({ quizData, id }) {
  if (!quizData)
    return (
      <NoQuizData
        title="Quiz Not Found"
        desc="Sorry, it seems that the quiz you are attempting to access is not available on this page. Please check if you have entered the correct URL. You may try to create your own quiz by clicking on the below button."
      />
    );

  if (quizData.expired)
    return (
      <NoQuizData
        title="Expired Quiz"
        desc="We're sorry, but it looks like the quiz you were trying to play has been expired. You may click on the below button to start creating your own Quiz. "
      />
    );

  const { title, desc, timer, timing, questions, createdBy, expiresAt } =
    quizData;
  const { showSetProfileInfo } = useContext(MyDataContext);
  const { myAnswers, resetMyAnswers, submitMyAnswers } =
    useContext(MyAnswersContext);
  const [qNo, setQno] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [quizz, setQuizzData] = useState(null);

  const nextQ = () => setQno(qNo + 1);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };
  useEffect(() => {
    let shuffledData = questions.map((val, i) => {
      return { ...val, options: shuffle(questions[i]?.options) };
    });
    setQuizzData(shuffledData);
    setHydrated(true);
    let name = localStorage.getItem("name");
    let key = location.pathname.split("/")[2];
    let myPlayedData = localStorage.getItem(key);
    if (myPlayedData) {
      let data = JSON.parse(myPlayedData);
      setAlreadyPlayed(data);
    }
    if (!name || name.trim() == "") {
      showSetProfileInfo();
    }
    resetMyAnswers();
  }, []);

  useEffect(() => {
    if (!questions[qNo]?.question) {
      submitMyAnswers();
    }
  }, [qNo]);

  if (!hydrated) {
    return null;
  }

  if (alreadyPlayed) {
    return (
      <>
        <Navbar />
        <main className="text-center p-5 bg-gray-100 py-10 w-full h-auto min-h-screen max-h-max">
          <Finished
            title="Quiz Already Played !!"
            cardText="It seems like you're trying to start a quiz that you've already played before. Sorry, but you can't play the same quiz twice. You can click on the button below to see the results of this Quiz."
            cardImg={"nerd-face"}
            showLink={true}
            linkHref={`/results/${id}`}
            linkText={"View Results"}
            quizContainerTitle="Your Played Answers:"
            quizContainerArray={alreadyPlayed}
          />
        </main>
      </>
    );
  }

  if (showModal) {
    return (
      <>
        <MetaTags title={title} desc={desc} />
        <main className="text-center p-5 bg-gray-100 py-10 w-full h-auto min-h-screen max-h-max">
          <ModalJoinQuiz
            closeModal={() => {
              setShowModal(false);
            }}
            title={title}
            description={desc}
            timer={timer}
            timing={timing}
            creator={createdBy}
            expiresAt={expiresAt}
          />
          <Quiz
            title={title}
            timer={false}
            timing={0}
            question={questions[0].question}
            answer={questions[0].answer}
            options={questions[0]?.options}
            queNo={"1"}
          />
        </main>
      </>
    );
  }

  return (
    <>
      {!questions[qNo]?.question && <Navbar />}

      <MetaTags title={title} desc={desc} />
      <main className="text-center p-5 bg-gray-100 py-10 w-full h-auto min-h-screen max-h-max ">
        {questions[qNo]?.question ? (
          <Quiz
            title={title}
            timer={timer}
            timing={timing}
            question={quizz[qNo].question}
            answer={quizz[qNo].answer}
            options={quizz[qNo]?.options}
            nextQ={nextQ}
            queNo={qNo + 1}
          />
        ) : (
          <Finished
            title="Quiz Result"
            cardText={`Congratulations! You have successfully completed the ${createdBy}'s quiz. Now, it's time to see how you did. Simply click on the button below to view your results page and find out if you've earned a top score. Good luck!`}
            cardImg={"partying-face"}
            showLink={true}
            linkHref={`/results/${id}`}
            linkText={"View Results"}
            quizContainerTitle="Your Answers:"
            quizContainerArray={myAnswers}
            celebration={true}
          />
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  await connectDb();
  const quiz = await quizQuestionSchema.findOne({ quizId: params.id }).lean();
  let quizData = JSON.parse(JSON.stringify(quiz));

  if (!quizData) {
    return {
      props: {
        quizData,
        id: params.id,
      },
    };
  }
  let expDay = new Date(quizData?.expiresAt);
  if(quizData.willExpire){
    if (expDay <= new Date()) {
      return {
        props: {
          quizData: {
            expired: true,
          },
          id: params.id,
        },
      };
    }
  }
  return {
    props: {
      quizData: JSON.parse(JSON.stringify(quizData)),
      id: params.id,
    },
  };
}
