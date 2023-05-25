import { useState, useContext } from "react";
import MyQuestionsContext from "@/context/Questions";
import ToggleSwitch from "./ToggleSwitch";

function AskTimer() {
  const { quizDetails, handleQuizDetails } = useContext(MyQuestionsContext);
  const [isChecked, setIsChecked] = useState(quizDetails["timer"]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    handleQuizDetails("timer", !isChecked);
    handleQuizDetails("timing", isChecked ? 0 : 15);
  };

  return (
    <>
      <ToggleSwitch isChecked={isChecked} handleToggle={handleToggle} />
      <div className="grid grid-cols-2 gap-2 p-2">
        {isChecked &&
          [15, 30, 45, 60].map((val, i) => {
            return (
              <button
                key={i}
                type="button"
                className={`p-2 rounded shadow-md border text-center text-sm font-medium hover:bg-blue-500 hover:border-blue-500 hover:text-white ${quizDetails["timing"] == val ?
                  "bg-blue-500 border-blue-500 text-white" : "border-gray-100 text-black bg-white"
                }`}
                onClick={() => handleQuizDetails("timing", val)}
              >
                {val}
                <span className="text-xs">s</span>
              </button>
            );
          })}
      </div>
    </>
  );
}

export default AskTimer;
