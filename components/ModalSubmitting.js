import { useState, useEffect } from "react";
import ModalBase from "@/components/ModalBase";

function Spinner() {
  const [loader, setLoader] = useState("border-t-gray-500")
  
  useEffect(()=>{
    setTimeout(()=>{
      setLoader(`${loader} border-r-gray-600`)
      setTimeout(()=>{
        setLoader(`${loader} border-r-gray-600 border-b-gray-700`)
      }, 2000)
    }, 2500);
  }, [])
  
  return (
    <div className="py-2">
      <div className={`h-10 w-10 mx-auto border-4 rounded-full animate-spin ${loader}`}></div>
    </div>
  );
}

export default function ModalSubmitting() {
  return (
    <ModalBase>
      <p className="font-semibold text-xl my-2">Submitting Your Quiz Data</p>
      <Spinner />
    </ModalBase>
  );
}
