import { useState, useEffect, useContext } from "react";
import MyDataContext from "@/context/MyData";
import MyAnswersContext from "@/context/Answers";
import { useTimer } from "react-timer-hook";

function Quiz({
  title,
  timer,
  timing,
  question,
  answer,
  options,
  queNo,
  nextQ,
  result = false,
  myAnswer,
}) {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + timing);
  const { showErrToast } = useContext(MyDataContext);
  const { pushMyAns } = useContext(MyAnswersContext);

  const [time, setTime] = useState(0);
  const [myAns, setMyAns] = useState(result ? myAnswer : "");
  const [nex, setNex] = useState(false);
  const [showCorrectAns, setShowCorrectAns] = useState(result);

  const { seconds, minutes, hours, days, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => timer && askNewQ(),
    });

  useEffect(() => {
    if (timer) {
      let perc = seconds / timing;
      let time = perc == 1 ? 100 : perc.toString().slice(2, 4) || 0;
      setTime(time.length == 1 ? `${time}0` : time);
    }
    resume();
  }, [seconds]);

  function askNewQ() {
    let newExp = new Date();
    newExp.setSeconds(newExp.getSeconds() + (timing + 1));
    pushMyAns({ question, options, answer, myAns });
    setShowCorrectAns(true);
    setTimeout(
      () => {
        nextQ();
        setMyAns("");
        restart(newExp);
        setNex(false);
        setShowCorrectAns(false);
      },
      time ? 1000 : 10
    );
  }

  const submitAns = () => {
    if (myAns == "") {
      showErrToast("Select an option to continue to next Question");
      return;
    }
    setShowCorrectAns(true);
    pause();
    if (!timer) {
      setNex(true);
      return;
    }
    askNewQ();
  };

  const getCls = (val) => {
    if (val == myAns && val !== answer) {
      return "border-red-400 bg-red-100";
    } else if (val == myAns || val == answer) {
      return "border-green-400 bg-green-100 font-semibold";
    }
    return "";
  };

  return (
    <>
      <span className="w-full text-2xl font-bold">{title}</span>
      <div className="w-full max-w-xl bg-white mt-5 mx-auto p-6 rounded-lg shadow-lg">
        {timer && (
          <div className="w-full h-auto mb-3 flex flex-col">
            <div className="flex justify-end bg-gray-200 rounded-3xl">
              <span
                className="h-2 rounded-3xl w-auto bg-blue-600 z-20"
                style={{ width: `${time}%` }}
              ></span>
            </div>
            <span
              className={`w-full text-xs font-bold text-gray-500 mt-1 text-end ${
                seconds >= 10
                  ? "text-green-500"
                  : seconds >= 6
                  ? "text-yellow-500"
                  : seconds <= 5 && "text-red-500"
              }`}
            >
              {seconds}s left
            </span>
          </div>
        )}
        <span className="block text-gray-700 text-lg mb-3 font-bold mb-2">
          {queNo}. {question}
        </span>
        <div className="options flex flex-col space-y-4 mb-4">
          {options?.map((val, i) => {
            return (
              <div
                onClick={(e) => {
                  !result && setMyAns(e.target.innerText);
                }}
                key={i}
                className={`inline-flex border-2 border-gray-300 hover:bg-blue-50 rounded p-3 items-center cursor-pointer w-full max-w-xs mx-auto ${
                  showCorrectAns && getCls(val)
                }`}
              >
                <span className="ml-2 text-gray-700">{val}</span>
              </div>
            );
          })}
        </div>
        {myAns == "" && showCorrectAns ? 
          <div className="my-4 border-2 border-red-400 bg-red-100 w-full max-w-xs p-3 rounded mx-auto">
           You didn't choose any option!!
          </div> : <></>
        }
        <div className="w-full flex justify-end">
          {!result && !nex ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold cursor-pointer py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={submitAns}
            >
              Submit
            </button>
          ) : (
            !result && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline"
                id="nextBtn"
                onClick={askNewQ}
              >
                Next
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;
