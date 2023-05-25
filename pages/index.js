import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head"
import Navbar from "@/components/Navbar";
import Finished from "@/components/Finished";
import MyDataContext from "@/context/MyData";
import getAvatar from "@/utils/avatar";

export default function Home() {
  const { MyName, showSetProfileInfo, showErrToast } =
    useContext(MyDataContext);
  const router = useRouter();
  const [myAvatar, setMyAvatar] = useState();
  const [myName, setMyName] = useState(MyName);
  const [hydrated, setHydrated] = useState(false);
  const [inputUrl, setInputUrl] = useState("");

  useEffect(() => {
    let name = localStorage.getItem("name");
    if (!name || name.trim() == "") {
      showSetProfileInfo();
    }
    setHydrated(true);
    getAvatar(myName).then((val) => setMyAvatar(val));
  }, []);

  const handleInput = (e) => {
    setInputUrl(e.target.value);
  };

  const validateUrl = () => {
    const urlRegex =
      /^(https?:\/\/(?:[\w-]+\.)+[\w-]+(?::\d+)?\/quiz\/[a-zA-Z0-9]+)$|^(https?:\/\/localhost(:\d+)?\/quiz\/[a-zA-Z0-9]+)$/i;

    if (inputUrl?.split("/")[2] == location.host || urlRegex.test(inputUrl)) {
      router.push(`/quiz/${inputUrl.split("/")[4]}`);
    } else if (inputUrl?.split("/")[2] !== location.host) {
      showErrToast("Input URL is not valid.");
    } else if (inputUrl.trim() == "") {
      showErrToast("Please enter a URL");
    } else if (!urlRegex.test(inputUrl)) {
      showErrToast("Please enter a valid URL");
    }
  };

  if (!hydrated) return null;

  return (
    <>
      <HeadComp origin={location.origin}/>
      <Navbar />
      <main className="w-screen text-center min-h-screen max-h-max p-5 bg-gray-100 py-10">
        <div className="w-full h-max max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <img
              className="mx-auto rounded-2xl my-2"
              src={myAvatar}
              alt="avatar"
              width="200"
              height="200"
            />
            <p className="text-lg font-semibold">
              {myName}
              <img
                onClick={() => router.push("/edit")}
                className="p-1 inline-block ml-2 rounded cursor-pointer"
                src="/edit.svg"
                alt="edit icon"
              />
            </p>
          </div>
          <button
            onClick={() => router.push("/create-quiz")}
            className="my-2 mx-auto bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 w-full max-w-xs rounded"
          >
            Create Your Own Quiz
          </button>
          <div className="flex max-w-xs mx-auto">
            <hr className="w-full my-auto" />
            <span className="text-gray-400 mx-2">Or</span>
            <hr className="w-full my-auto" />
          </div>
          <div className="my-4 w-full max-w-xs flex flex-col mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-start px-2">
              Paste a quiz Url here to join:
            </label>
            <input
              onChange={handleInput}
              value={inputUrl}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight cursor-text focus:outline-none focus:shadow-outline"
              type="url"
              placeholder={`${location.origin}/quiz/123...`}
            />
          </div>
          <button
            onClick={validateUrl}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer relative left-[5.5rem] md:left-[7rem] font-bold py-2 px-4 rounded"
          >
            Join Quiz
          </button>
        </div>
      </main>
    </>
  );
}

function HeadComp({origin}) {
  return (
    <Head>
      <title>Quizik - Exciting Quizzes</title>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="description" content="Quizik: Quizzes that entertain, educate, and enlighten. Test your knowledge, ignite curiosity, and have fun while learning. Start your quiz adventure today!" />
      <meta name="keywords" content="quiz, quizzes, trivia, knowledge, learning, education, fun, interactive, challenge, test, game, play, entertainment, curiosity, facts, brain teaser, puzzle, mind games, quiz platform, quiz website" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${origin}/`} />
      <meta property="og:title" content="Quizik - Exciting Quizzes" />
      <meta property="og:description" content="Quizik: Quizzes that entertain, educate, and enlighten. Test your knowledge, ignite curiosity, and have fun while learning. Start your quiz adventure today!" />
      <meta
        property="og:image"
        content={`${origin}/favicon.ico`}
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${origin}/`} />
      <meta property="twitter:title" content="Quizik - Exciting Quizzes" />
      <meta property="twitter:description" content="Quizik: Quizzes that entertain, educate, and enlighten. Test your knowledge, ignite curiosity, and have fun while learning. Start your quiz adventure today!" />
      <meta
        property="twitter:image"
        content={`${origin}/favicon.ico`}
      />
    </Head>
  );
}
