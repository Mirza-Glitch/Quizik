import { useState, useContext } from "react";
import MyQuestionsContext from "@/context/Questions";

function CreateQuestion({ question, index }) {
  const {
    handleInputChange,
    addAnotherOption,
    removeQuestion,
    handleSetAnswer,
    handleRemoveOption,
  } = useContext(MyQuestionsContext);
  const [optWarn, setOptWarn] = useState(false);
  const [chooseAns, setChooseAns] = useState(false);
  const [showOpt, setShowOpt] = useState(false);
  const [showOptIndex, setShowOptIndex] = useState(null);

  return (
    <div className="w-full h-auto max-w-xl mx-auto bg-white shadow-lg p-3 mt-2 mb-6 text-start rounded-lg relative">
      <span className="absolute top-3 right-3">
        <img
          onClick={() => removeQuestion(question.id)}
          className="p-1 inline-block ml-2 rounded cursor-pointer"
          src="/trash.svg"
          alt="trash icon"
        />
      </span>
      <div className="my-2 px-2">
        <label className="font-bold text-lg">Question {index + 1}: </label>
        <input
          className="block border border-gray-100 focus:border-gray-300 focus:outline-none shadow-sm rounded p-2 w-full"
          value={question["question"]}
          onChange={(e) =>
            handleInputChange(question["id"], "question", e.target.value)
          }
          placeholder="Write Question here..."
          required={true}
        />
      </div>
      <div className="block my-2 px-2">
        <label className="font-bold text-lg block">Options: </label>
        <div className="grid grid-cols-1 gap-2 my-2">
          {question["options"].map((val, i) => {
            return (
              <span key={i} className="inline-block relative">
                <input
                  className="border border-gray-100 focus:border-gray-300 focus:outline-none shadow-sm rounded p-2 w-full"
                  value={val}
                  onChange={(e) => {
                    if (e.target.value.length <= 60) {
                      optWarn && setOptWarn(false);
                      handleInputChange(
                        question["id"],
                        "options",
                        e.target.value,
                        i
                      );
                    } else {
                      setOptWarn(true);
                    }
                  }}
                  onFocus={() => {
                    setShowOpt(true);
                    setShowOptIndex(i);
                  }}
                  onBlur={() => {
                    setShowOpt(false);
                    setShowOptIndex(null);
                  }}
                  placeholder={`options ${i + 1}`}
                  required={true}
                />
                <span className="absolute top-0 right-0 w-auto h-full flex flex-row rounded-r">
                  {chooseAns && (
                    <span
                      className="text-xs text-green-400 border-2 border-green-400 hover:bg-green-400 hover:text-white flex flex-col justify-center items-center rounded-r px-1"
                      onClick={() => {
                        setChooseAns(false);
                        handleSetAnswer(question["id"], i);
                      }}
                    >
                      <span>&#10003;</span>
                      <span>choose</span>
                    </span>
                  )}
                  {showOpt && showOptIndex == i && (
                    <span
                      className="text-xs text-red-400 border-2 border-red-400 hover:bg-red-400 hover:text-white flex flex-col justify-center items-center rounded-r px-1"
                      onClick={() => handleRemoveOption(question["id"], i)}
                    >
                      <span>&#10006;</span>
                      <span>remove</span>
                    </span>
                  )}
                </span>
              </span>
            );
          })}
          {optWarn && (
            <div className="text-sm text-red-700">
              Options cannot contain more than 60 characters
            </div>
          )}
          {question["options"].length < 4 && (
            <button
              type="button"
              className="inline-block p-2 border border-blue-500 text-white bg-blue-500 hover:bg-blue-700 rounded shadow-lg"
              onClick={() => addAnotherOption(question["id"])}
            >
              Add Option
            </button>
          )}
        </div>
      </div>
      <div className="block my-2 px-2">
        <label className="font-bold text-lg">Correct answer: </label>
        <span className="grid grid-cols-2 gap-2">
          <input
            className="inline-block border border-gray-100 focus:border-gray-300 focus:outline-none shadow-sm rounded p-2"
            value={question["answer"]}
            placeholder="correct answer"
            readOnly={true}
          />
          <button
            type="button"
            className="inline-block p-2 border border-blue-500 text-white bg-blue-500 hover:bg-blue-700 rounded shadow-lg"
            onClick={() => {
              setChooseAns(true);
            }}
          >
            Select Answer
          </button>
        </span>
      </div>
    </div>
  );
}

export default CreateQuestion;
