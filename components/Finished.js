import Quiz from "@/components/Quiz";
import Link from "next/link";

function Finished({
  title,
  cardText,
  cardImg,
  showLink,
  linkHref,
  linkText,
  quizContainerTitle,
  quizContainerArray,
  celebration = false,
}) {
  
  return (
    <>
      <div className="w-full h-max max-w-xl mx-auto mt-4 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-8">{title}</h1>
        <div className="flex justify-center items-center mb-8 relative">
          <img src={`/${cardImg}.png`} alt={cardImg} height="100" width="100" />
          {celebration && (
            <>
              <img
                className="absolute left-2"
                src={`/party-popper.gif`}
                alt={cardImg}
                height="100"
                width="100"
              />
              <img
                className="absolute right-2 -scale-x-100"
                src={`/party-popper.gif`}
                alt={cardImg}
                height="100"
                width="100"
              />
            </>
          )}
        </div>
        <p className="text-lg mb-8">{cardText}</p>
        {showLink && (
          <Link
            href={linkHref}
            className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-4 rounded"
          >
            {linkText}
          </Link>
        )}
      </div>
      <div className="w-full max-w-xl text-center h-max mx-auto mt-2 py-10">
        <p className="mb-3 text-xl font-semibold text-start">
          {quizContainerTitle}
        </p>
        {quizContainerArray?.map((val, i) => {
          return (
            <div key={i}>
              <Quiz
                title={""}
                timer={false}
                timing={0}
                question={quizContainerArray[i].question}
                answer={quizContainerArray[i].answer}
                options={quizContainerArray[i]?.options}
                myAnswer={quizContainerArray[i].myAns}
                queNo={i + 1}
                result={true}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Finished;
