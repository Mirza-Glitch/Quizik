import { MyDataProvider } from "@/context/MyData";
import { MyAnswersProvider } from "@/context/Answers";
import { MyQuestionsProvider } from "@/context/Questions";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {

  return (
    <>
      <MyDataProvider>
        <MyQuestionsProvider>
          <MyAnswersProvider>
            <Component {...pageProps} />
          </MyAnswersProvider>
        </MyQuestionsProvider>
      </MyDataProvider>
    </>
  );
}
