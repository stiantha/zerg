import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/Content";

const App = () => {
  const [language, setLanguage] = useState("English");

  return (
    <div className="min-h-screen min-w-screen bg-neutral-900 text-gray-300 font-mono flex flex-col">
      <Header language={language} setLanguage={setLanguage} />
      <div className="flex">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default App;
