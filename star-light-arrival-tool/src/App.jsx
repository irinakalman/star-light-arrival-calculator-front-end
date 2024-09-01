import { useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboard";

function App() {
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  //   if (isDarkMode) {
  //     document.documentElement.classList.remove("dark");
  //   } else {
  //     document.documentElement.classList.add("dark");
  //   }
  // };
  return (
    <>
      <div className="min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* <div className="flex justify-end">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded"
          >
            Toggle Dark Mode
          </button>
        </div> */}

        <div className="max-w-lg mx-auto lg:max-w-lg px-4 mt-8">
          <h1 className="text-3xl pb-8 mb-5 text-white">
            Please choose your date of birth to see your star ⭐
          </h1>
          
        </div>
        <Dashboard />
      </div>
    </>
  );
}

export default App;
