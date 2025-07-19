import { useEffect, useState } from "react";
import ApiKeyScreen from "./ApiKeyScreen";
import HintScreen from "./HintScreen";
import { Toaster, toast } from "sonner";
import { getGeminiHint } from "./api";

const Popup = () => {
  const [apiKey, setApiKey] = useState("");
  const [showHintScreen, setShowHintScreen] = useState(false);
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState(
    "Give a subtle hint on what's wrong with this LeetCode solution."
  );

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

  const onGetHint = async () => {
    setLoading(true);
    setHint("Fetching code...");

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      chrome.tabs.sendMessage(
        tab.id,
        { type: "GET_LEETCODE_CODE" },
        async (response) => {
          if (!response || response.error) {
            toast.error("Failed to get code from page.");
            setHint("Could not get code.");
            setLoading(false);
            return;
          }

          const prompt =
            userPrompt ||
            "Give a subtle hint on what's wrong with this LeetCode solution.";

          const result = await getGeminiHint({
            code: response.code,
            prompt,
            title: response.title,
            description: response.description,
            apiKey,
          });

          setHint(result);
          setLoading(false);
        }
      );
    } catch (err) {
      toast.error("Something went wrong.");
      setHint("Error generating hint.");
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-center" richColors />
      <div className="w-full h-screen overflow-y-auto px-4 py-6 bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 font-sans text-sm">
        {showHintScreen ? (
          <HintScreen
            apiKey={apiKey}
            hint={hint}
            loading={loading}
            onGetHint={onGetHint}
            setUserPrompt={setUserPrompt}
            userPrompt={userPrompt}
            setApiKey={setApiKey}
            saveKey={saveKey}
          />
        ) : (
          <ApiKeyScreen
            apiKey={apiKey}
            setApiKey={setApiKey}
            saveKey={saveKey}
          />
        )}
      </div>
    </>
  );
};

export default Popup;
