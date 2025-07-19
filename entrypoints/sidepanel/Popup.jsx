import { useEffect, useState } from "react";
import ApiKeyScreen from "./ApiKeyScreen";
import HintScreen from "./HintScreen";
import { Toaster, toast } from "sonner";
import { getGeminiHint } from "./api";
import MainScreen from "./MainScreen";

const Popup = () => {
  const [apiKey, setApiKey] = useState("");
  const [showMainScreen, setShowMainScreen] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["GEMINI_API_KEY"], (result) => {
      if (result.GEMINI_API_KEY) {
        setApiKey(result.GEMINI_API_KEY);
        setShowMainScreen(true);
      }
    });
  }, []);

  const saveKey = () => {
    chrome.storage.local.set({ GEMINI_API_KEY: apiKey }, () => {
      setShowMainScreen(true);
    });
  };

  return (
    <>
      <Toaster position="bottom-center" richColors />
      {showMainScreen ? (
        <MainScreen apiKey={apiKey} setApiKey={setApiKey} saveKey={saveKey}/>
      ) : (
        <ApiKeyScreen apiKey={apiKey} setApiKey={setApiKey} saveKey={saveKey} />
      )}
    </>
  );
};

export default Popup;
