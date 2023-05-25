import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import MyDataContext from "@/context/MyData";
import getAvatar from "@/utils/avatar";
import { GoBackBtn } from "@/components/BackBtn";

export default function MyProfile() {
  const { MyName, showSuccessToast, showErrToast, setTrueToName } =
    useContext(MyDataContext);
  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState(MyName);
  const [myNameExists, setMyNameExists] = useState(null)

  useEffect(() => {
    getAvatar(name).then((val) => setAvatar(val));
  }, [name]);
  useEffect(() => {
    let name = localStorage.getItem("name")
    if(name){
      setMyNameExists(name)
    }
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name.trim() == "") {
      showErrToast("Name cannot be empty!!");
      return;
    }
    if (name.length > 12) {
      showErrToast("Name cannot be more than 12 characters!!");
      return;
    }
    localStorage.setItem("name", name);
    router.back();
    showSuccessToast("Profile Setup done Successfully!!");
    setTrueToName();
  };

  return (
    <main className="w-screen text-center h-screen p-5 bg-gray-100 py-10">
      {myNameExists && <GoBackBtn />}
      <h1 className="text-2xl font-bold mb-8">Setup Your Profile</h1>
      <div className="w-full h-max max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center mb-4">
          <p className="text-lg font-bold">Avatar</p>
          <img
            className="rounded mx-auto mt-2"
            src={avatar}
            alt="avatar"
            width="200"
            height="200"
          />
        </div>
        <div className="my-4 w-full max-w-xs flex flex-col mx-auto">
          <label className="block text-gray-700 text-sm font-bold mb-2 text-start px-2">
            Enter your name here:
          </label>
          <input
            onChange={handleName}
            value={name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Username"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white cursor-pointer relative left-14 md:left-16 font-bold py-2 px-4 rounded"
        >
          Save and Continue
        </button>
      </div>
    </main>
  );
}
