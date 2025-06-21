import { useEffect, useState } from "react";
import ApiKeyScreen from "./ApiKeyScreen";
// import HintScreen from "./HintScreen"; // your main interaction screen

const Popup = () => {
  const [apiKey, setApiKey] = useState("");
  const [showHintScreen, setShowHintScreen] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["GEMINI_API_KEY"], (result) => {
      if (result.GEMINI_API_KEY) {
        setApiKey(result.GEMINI_API_KEY);
        setShowHintScreen(true);
      }
    });
  }, []);

  const saveKey = () => {
    chrome.storage.local.set({ GEMINI_API_KEY: apiKey }, () => {
      setShowHintScreen(true);
    });
  };

  return (
    <div className="w-[360px] min-h-[400px] p-4 bg-white text-gray-900 dark:bg-[#1e1e1e] dark:text-gray-100 font-sans text-sm rounded-md shadow-md space-y-4 overflow-auto">
      {showHintScreen ? (
        // <HintScreen apiKey={apiKey} />
        <ApiKeyScreen apiKey={apiKey} setApiKey={setApiKey} saveKey={saveKey} />
      ) : (
        <ApiKeyScreen apiKey={apiKey} setApiKey={setApiKey} saveKey={saveKey} />
      )}
    </div>
  );
};

export default Popup;
