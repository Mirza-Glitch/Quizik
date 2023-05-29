import { useState, useEffect, useContext } from "react";
import MyQuestionsContext from "@/context/Questions";
import MyDataContext from "@/context/MyData";
import ModalCreateLater from "@/components/ModalCreateLater"
import AskTimer from "@/components/AskTimer";
import { GoBackBtn } from "@/components/BackBtn";

function CreateQuiz() {
  const { quizDetails, handleQuizDetails, handleDetailsSubmit, checkIfQuizAlreadyCreated } =
    useContext(MyQuestionsContext);
  const { showSetProfileInfo } = useContext(MyDataContext);
  const [createLater, setCreateLater] = useState(false)

  useEffect(() => {
    let name = localStorage.getItem("name");
    if (!name || name.trim() == "") {
      showSetProfileInfo();
    }
    setCreateLater(checkIfQuizAlreadyCreated())
  }, []);

  return (
    <>
      {!createLater && <ModalCreateLater />}
      <GoBackBtn />
      <form
        onSubmit={handleDetailsSubmit}
        className="w-full text-center h-auto min-h-screen max-h-max p-5 bg-gray-100 py-10"
      >
        <div className="w-full h-max max-w-xl mx-auto bg-white shadow-lg p-3 mt-2 mb-6 text-start rounded-lg">
          <div className="my-2 px-2">
            <label className="font-bold text-lg">Title: </label>
            <input
              type="text"
              className="block border border-gray-100 focus:border-gray-300 focus:outline-none shadow-sm rounded p-2 w-full"
              value={quizDetails["title"]}
              onChange={(e) => handleQuizDetails("title", e.target.value)}
              placeholder="Write Your Quiz Title Here..."
              minLength="6"
              required={true}
            />
          </div>
          <div className="my-2 px-2">
            <label className="font-bold text-lg">Description: </label>
            <textarea
              type="text"
              className="block border border-gray-100 focus:border-gray-300 focus:outline-none shadow-sm rounded p-2 w-full"
              value={quizDetails["desc"]}
              onChange={(e) => handleQuizDetails("desc", e.target.value)}
              rows="5"
              placeholder="Write Your Quiz Description Here..."
              required={true}
            />
          </div>
          <div className="mt-4 px-2">
            <AskTimer />
          </div>
          <hr />
          <div className="mt-2 px-2">
            <label className="block flex justify-between cursor-pointer font-semibold">
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
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full max-w-xl mx-auto p-2 font-medium text-lg border border-blue-500 text-white bg-blue-500 hover:bg-blue-700 rounded shadow-lg"
        >
          Next »
        </button>
      </form>
    </>
  );
}

export default CreateQuiz;
