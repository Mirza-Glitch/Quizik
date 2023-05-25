import Link from "next/link";
import timeSince from "@/utils/timeSince"

export default function Card({ data }) {
  const { title, desc, quizId, createdBy, expiresAt } = data;
  
  let expired = expiresAt ? timeSince(expiresAt) : "ago"
  if(expired?.includes("ago")){
    return <></>
  }

  return (
    <>
      <div className="bg-white p-3 my-3 h-max rounded-2xl border border-gray-200">
        <div className="flex justify-between items-center break-words py-2">
          <span className="font-bold text-lg">{title}</span>
          <span className="inline-block text-sm text-gray-400">
            expires {expired}
          </span>
        </div>
        <hr />
        <div className="py-2 py-2 text-gray-600 text-start">
          {desc.length >= 125 ? desc.slice(0, 124) + "..." : desc}
        </div>
        <hr />
        <div className="flex justify-between items-center py-2">
          <div className="text-start break-words w-auto">
            <span className="text-sm mr-2">created By: </span>
            <span className="text-lg font-medium">
              {createdBy}
            </span>
          </div>
          <Link
            href={`/quiz/${quizId}`}
            className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 w-max rounded"
          >
            Play
          </Link>
        </div>
      </div>
    </>
  );
}
