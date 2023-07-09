import { createContext, useState } from "react";
import uid from "@/utils/uid";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalSubmitting from "@/components/ModalSubmitting";

const MyQuestionsContext = createContext();

export const MyQuestionsProvider = ({ children }) => {
  const router = useRouter();
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    desc: "",
    timer: false,
    willExpire: true,
    timing: 0,
    days: 3,
  });
  const [myQuestions, setMyQuestions] = useState([
    {
      id: uid(),
      question: "",
      options: ["", ""],
      answer: "",
    },
  ]);
  const [resData, setResData] = useState(null)
  const [showLoader, setShowLoader] = useState(false);

  const handleQuizDetails = (key, value) => {
    let newObj = quizDetails;
    newObj[key] = value;
    setQuizDetails({ ...newObj });
  };

  const handleInputChange = (id, key, value, oIndex = null) => {
    let newData = myQuestions.map((val, i) => {
      if (val["id"] == id) {
        if (oIndex !== null) {
          val[key][oIndex] = value.toString();
          return val;
        }
        val[key] = value;
        return val;
      }
      return val;
    });
    setMyQuestions(newData);
  };

  const addAnotherOption = (id) => {
    let newData = myQuestions.map((val, i) => {
      if (val["id"] == id) {
        val["options"] = [...val.options, ""];
        return val;
      }
      return val;
    });
    setMyQuestions(newData);
  };

  const addAnotherQuestion = () => {
    let newQuestionObj = {
      id: uid(),
      question: "",
      options: ["", ""],
      answer: "",
    };
    setMyQuestions((prev) => [...prev, newQuestionObj]);
  };

  const removeQuestion = (id) => {
    setMyQuestions(myQuestions.filter((obj) => obj.id !== id));
  };

  const handleSetAnswer = (id, ansIndex) => {
    let newData = myQuestions.map((val, i) => {
      if (val["id"] == id) {
        let myAns = val["options"][ansIndex];
        val["answer"] = myAns;
        return val;
      }
      return val;
    });
    setMyQuestions(newData);
  };

  const handleRemoveOption = (id, optIndex) => {
    let newData = myQuestions.map((val, i) => {
      if (val["id"] == id) {
        let options = val["options"];
        options[optIndex] = null;
        let newOptions = options.filter((opt) => opt !== null);
        val["options"] = newOptions;
        return val;
      }
      return val;
    });
    setMyQuestions(newData);
  };

  const validateQuestions = () => {
    let qIndex;
    if (myQuestions.length < 3) {
      toast.error(
        "You need to have atleast 3 questions to submit your quiz !!"
      );
      return false;
    } else {
      myQuestions.map((val, i) => {
        if (val.question.trim() == "") {
          qIndex = i + 1;
        }
      });
      if (qIndex) {
        toast.error(
          `Please check your question ${qIndex} again. Questions cannot be empty !!`
        );
        return false;
      }
    }
    return true;
  };
  const validateOptions = () => {
    let qIndex;
    let qMsg;

    myQuestions.map((val, i) => {
      if (val.options.length < 2) {
        qIndex = i + 1;
        qMsg = `A question cannot have less than 2 Choices. Please check your question ${qIndex} !!`;
      } else {
        val.options.map((oVal, oInded) => {
          if (oVal.trim() == "") {
            qIndex = i + 1;
            qMsg = `Choices cannot be empty. Please check your question ${qIndex} !!`;
          }
        });
      }
    });

    if (qIndex) {
      toast.error(qMsg);
      return false;
    }
    return true;
  };
  const validateAnswers = () => {
    let qIndex;

    myQuestions.map((val, i) => {
      if (val.answer.trim() == "" || val.answer == "") {
        qIndex = i + 1;
      }
    });
    if (qIndex) {
      toast.error(`Please select an answer for question ${qIndex} !!`);
      return;
    }
    return true;
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    router.push("/create-quiz/add-questions");
  };

  const resetQuestions = () => {
    setQuizDetails({
      title: "",
      desc: "",
      timer: false,
      timing: 0,
      days: 3,
    });
    setMyQuestions([
      {
        id: uid(),
        question: "",
        options: ["", ""],
        answer: "",
      },
    ]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let validQs = validateQuestions();
    let validOs = validateOptions();
    let validAs = validateAnswers();
    if (validQs && validOs && validAs) {
      let name = localStorage.getItem("name")
      setShowLoader(true);
      fetch(`${location.origin}/api/create-quiz`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizId: uid(),
          createdBy: name,
          ...quizDetails,
          questions: myQuestions,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          setShowLoader(false)
          if (data.success) {
            setResData(data.data)
            resetQuestions()
            localStorage.setItem("createdQuestion", JSON.stringify(Date.now()))
            router.push("/create-quiz/created");
            toast.success("Quiz Has Been Created Successfully!!");
          }
          if (data.error) {
            toast.error(
              "There was an error while submitting your quiz data\nPlease try again !!"
            );
          }
        })
        .catch((e) => {
          setShowLoader(false);
          toast.error(
            "There was an error while submitting your quiz data\nPlease try again !!"
          );
          console.log(e);
        });
    } else {
      toast.error(
        "Looks like There was an error while trying Validate your given Data\nPlease try again."
      );
    }
  };

  const showEnterQuizDetails = () => {
    toast.info("Please Enter Your Basic Quiz Details First !!");
  };

  const showEnterQuestions = () => {
    toast.info("Please Enter Your Quiz Questions First !!");
  };
  
  const checkIfQuizAlreadyCreated = () => {
    let isCreated = localStorage.getItem("createdQuestion");
    if (isCreated) {
      let createdDay = new Date(Number(isCreated));
      createdDay.setDate(createdDay.getDate() +1);
      return Date.now() < createdDay;
    }
    return false;
  };

  const values = {
    quizDetails,
    myQuestions,
    resData,
    handleQuizDetails,
    handleInputChange,
    addAnotherOption,
    addAnotherQuestion,
    removeQuestion,
    handleSetAnswer,
    handleRemoveOption,
    handleDetailsSubmit,
    handleFormSubmit,
    showEnterQuizDetails,
    showEnterQuestions,
    checkIfQuizAlreadyCreated,
  };
  return (
    <MyQuestionsContext.Provider value={values}>
      {showLoader && <ModalSubmitting />}
      {children}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={2}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </MyQuestionsContext.Provider>
  );
};

export default MyQuestionsContext;
