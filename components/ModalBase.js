import { useEffect } from "react";

export default function ModalBase({ children }) {
  
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <>
      <div className="h-[100vh] w-[100vw] fixed top-0 bottom left-0 right-0 z-40 opacity-40 bg-gray-100"></div>
      <div className="fixed h-auto w-max max-w-xs break-words top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-50 bg-white p-6 rounded-lg drop-shadow-2xl">
        {children}
      </div>
    </>
  );
}
