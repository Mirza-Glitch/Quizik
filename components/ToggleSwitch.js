function ToggleSwitch({ isChecked, handleToggle }) {
  return (
    <>
      <label
        htmlFor="toggle"
        className="block flex justify-between cursor-pointer font-medium text-sm"
      >
      Add timer to your Questions? 
        <div className="relative">
          <input
            id="toggle"
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            onChange={handleToggle}
          />
          <div
            className={`w-12 h-6 bg-gray-300 flex items-center px-1 rounded-full shadow-inner ${
              isChecked ? "bg-blue-500" : ""
            }`}
          >
            <div
              className={`transform transition-all duration-500 ease-in-out w-5 h-5 rounded-full bg-white shadow-md ${
                isChecked ? "translate-x-5" : ""
              }`}
            ></div>
          </div>
        </div>
      </label>
    </>
  );
}

export default ToggleSwitch;
