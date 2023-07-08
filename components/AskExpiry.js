import { useState, useContext } from "react";
import MyQuestionsContext from "@/context/Questions";
import ToggleSwitch from "@/components/ToggleSwitch"

function AskExpiry({ children }) {
  const { quizDetails, handleQuizDetails } = useContext(MyQuestionsContext);
  const [expiry, setExpiry] = useState(quizDetails["willExpire"]);

  const handleExpd = () => {
    setExpiry(!expiry);
    handleQuizDetails("willExpire", !expiry);
  };

  return (
    <>
      <ToggleSwitch isChecked={expiry} handleToggle={handleExpd} labelText={"Set expiry Day for my Quiz ?"} toggleId={"toggleExp"} />
      {expiry && (
        <>
          <label className="mt-2 block flex justify-between cursor-pointer font-semibold">
            How many days would you like to keep your quiz live ?
          </label>
          <div className="grid grid-cols-3 gap-2 p-2">
            {[3, 5, 7].map((val, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  className={`p-2 rounded shadow-md border text-center text-sm font-medium hover:bg-blue-500 hover:border-blue-500 hover:text-white ${
                    quizDetails["days"] == val
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "border-gray-100 text-black bg-white"
                  }`}
                  onClick={() => handleQuizDetails("days", val)}
                >
                  {val}
                  <span className="text-xs"> days</span>
                </button>
              );
            })}
          </div>{" "}
        </>
      )}{" "}
    </>
  );
}

export default AskExpiry;
