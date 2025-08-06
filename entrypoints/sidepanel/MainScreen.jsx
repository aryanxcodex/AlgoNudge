import { useEffect, useState } from "react";
import ApiKeyScreen from "./ApiKeyScreen";
import HintScreen from "./HintScreen";
import { Toaster, toast } from "sonner";
import { getGeminiHint } from "./api";
import Resources from "./Resources";

const MainScreen = ({ apiKey, setApiKey, saveKey }) => {
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPrompt, setUserPrompt] = useState(
    "Give a subtle hint on what's wrong with this LeetCode solution."
  );
  const [currentTab, setCurrentTab] = useState("hints");

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
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center border-b border-gray-200 w-full">
          <button
            className={`text-sm font-medium mr-4 py-2 px-4 w-1/2 ${
              currentTab === "hints"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setCurrentTab("hints")}
          >
            Hints
          </button>
          <button
            className={`text-sm font-medium py-2 px-4 w-1/2 ${
              currentTab === "resources"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setCurrentTab("resources")}
          >
            Resources
          </button>
        </div>
      </div>
      {currentTab === "hints" ? (
        <HintScreen
          onGetHint={onGetHint}
          hint={hint}
          loading={loading}
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          apiKey={apiKey}
          setApiKey={setApiKey}
          saveKey={saveKey}
        />
      ) : (
        <Resources />
      )}
    </div>
  );
};

export default MainScreen;
