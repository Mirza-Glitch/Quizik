import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyDataContext = createContext();

export const MyDataProvider = ({ children }) => {
  const router = useRouter();
  const [MyName, setMyName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) setMyName(name);
  }, []);

  const showSetProfileInfo = () => {
    router.push("/edit");
    toast.info("Please setup your profile first!!");
  };
  const showErrToast = (msg) => toast.error(msg);
  const showSuccessToast = (msg) => toast.success(msg, { autoClose: 2900 });
  const setTrueToName = () => {
    setMyName(localStorage.getItem("name"));
  };

  const values = {
    MyName,
    showSetProfileInfo,
    showErrToast,
    showSuccessToast,
    setTrueToName,
  };

  return (
    <MyDataContext.Provider value={values}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </MyDataContext.Provider>
  );
};

export default MyDataContext;
