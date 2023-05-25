import ModalBase from "@/components/ModalBase";
import { useRouter } from "next/router";
import timeSince from "@/utils/timeSince";

export default function ModalJoinQuiz({
  closeModal,
  title,
  description,
  timer,
  timing,
  creator,
  expiresAt,
}) {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <ModalBase>
      <p className="font-semibold text-xl text-center my-2">{title}</p>
      <p className="mb-2">
        Welcome to {creator}'s quiz! Please note that this quiz will expire{" "}
        {timeSince(expiresAt)}.{" "}
        {timer && `You'll have ${timing} seconds to answer each question.`}
      </p>
      <div>
        <span className="text-gray-700">Quiz Description: </span>
        <span>{description}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          className="bg-gray-100 hover:bg-blue-700 hover:text-white cursor-pointer text-black font-bold py-2 px-4 rounded"
          onClick={() => goBack()}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
          onClick={() => closeModal()}
        >
          Play
        </button>
      </div>
    </ModalBase>
  );
}
