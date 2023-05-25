import { createContext, useContext, useState, useEffect } from "react";
import uid from "@/utils/uid";
import MyDataContext from "@/context/MyData";

const MyAnswersContext = createContext();

export const MyAnswersProvider = ({ children }) => {
  const [myAnswers, setMyAnswers] = useState([]);
  const { showSuccessToast } = useContext(MyDataContext);

  const pushMyAns = (obj) => {
    setMyAnswers([...myAnswers, obj]);
  };

  const resetMyAnswers = () => {
    setMyAnswers([]);
  };

  const submitMyAnswers = () => {
    let key = location.pathname.split("/")[2];
    let value = JSON.stringify(myAnswers);
    let name = localStorage.getItem("name");

    fetch(`${location.origin}/api/save-result`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quizId: key,
        name,
        questions: myAnswers,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        showSuccessToast("Congratulations!! You Have Successfully Finished This Quiz")
        localStorage.setItem(key, value);
      });
  };

  const values = { myAnswers, pushMyAns, resetMyAnswers, submitMyAnswers };

  return (
    <MyAnswersContext.Provider value={values}>
      {children}
    </MyAnswersContext.Provider>
  );
};

export default MyAnswersContext;
