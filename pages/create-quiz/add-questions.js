import { useState, useLayoutEffect, useContext } from "react";
import MyQuestionsContext from "@/context/Questions";
import { useRouter } from "next/router"
import CreateQuestion from "@/components/CreateQuestion";
import ModalCreateLater from "@/components/ModalCreateLater"
import { GoBackBtn } from "@/components/BackBtn"

function CreateQuiz() {
  const { quizDetails, myQuestions, addAnotherQuestion, handleFormSubmit, showEnterQuizDetails, checkIfQuizAlreadyCreated } = useContext(MyQuestionsContext);
  const router = useRouter()
  const [createLater, setCreateLater] = useState(false)
  
  useLayoutEffect(()=>{
    if(quizDetails.title.trim() == ""){
      router.push("/create-quiz")
      showEnterQuizDetails()
    }
    setCreateLater(checkIfQuizAlreadyCreated())
  },[])

  return (
    <main className="w-full text-center h-auto min-h-screen max-h-max p-5 bg-gray-100 py-10 relative">
    {!createLater && <ModalCreateLater />}
    <GoBackBtn />
    <form onSubmit={handleFormSubmit}>
      {myQuestions.map((val, i) => {
        return <CreateQuestion key={i} question={val} index={i} />;
      })}
      <div className="w-auto max-w-lg mx-auto flex flex-col gap-2">
      {myQuestions.length <= 9 && <button type="button" className="p-2 border border-blue-500 text-white bg-blue-500 hover:bg-blue-700 rounded shadow-lg" onClick={addAnotherQuestion}>
        Add A New Question
      </button>}
      <input type="submit"
      value="Submit Your Quiz"
      className="p-2 border border-blue-500 text-white bg-blue-500 hover:bg-blue-700 rounded shadow-lg" />
      </div>
      </form>
    </main>
  );
}

export default CreateQuiz;
