import { useState, useEffect } from "react";
import ModalBase from "@/components/ModalBase";
import { useRouter } from "next/router";
import timeSince from "@/utils/timeSince";

export default function ModalCreateLater() {
  const router = useRouter();
  
  const [lastDay, setLastDay] = useState(null)
  const [newDay, setNewDay] = useState(null)
  
  useEffect(()=>{
    let prevDay = localStorage.getItem("createdQuestion")
    setLastDay(Number(prevDay))
    let nextDay = new Date(Number(prevDay))
    nextDay.setDate(nextDay.getDate() + 1)
    setNewDay(nextDay)
  },[])

  return (
    <ModalBase>
    <p className="font-semibold text-xl text-center my-2">
      Come Back Later !!
    </p>
      <p className="mb-2">
        It appears that you have recently created a quiz {timeSince(lastDay)}. Our platform permits users to create one quiz per 24-hour period
        for fairness and optimization purposes. Therefore, you will be able to
        create your next quiz {timeSince(newDay)}. We encourage you to
        return after this time has elapsed and create another engaging quiz!
      </p>
      <div className="grid grid-cols-1 gap-2 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/")}
        >
          Home Page
        </button>
      </div>
    </ModalBase>
  );
}
