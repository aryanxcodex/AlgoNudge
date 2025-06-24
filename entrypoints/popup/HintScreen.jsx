import { useState } from "react";
import {
  Loader2,
  Sparkles,
  Brain,
  MessageSquare,
  Zap,
  KeyRound,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const HintScreen = ({
  onGetHint,
  hint,
  loading,
  userPrompt,
  setUserPrompt,
  apiKey,
  setApiKey,
  saveKey,
}) => {
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const handleClick = () => {
    onGetHint(userPrompt);
  };

  const handleApiKeySave = () => {
    if (apiKey.trim() === "") {
      return toast.error("API key cannot be empty!");
    }
    saveKey();
    setShowApiKeyInput(false);
  };

  return (
    <div className="w-full max-w-sm bg-gray-900 text-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-700 transform transition-transform duration-200 hover:scale-110">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">AlgoNudge</h2>
            <p className="text-xs text-gray-400">Smart debugging assistant</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Prompt input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-800" />
            <label className="text-sm font-medium text-gray-300">
              Your Prompt
            </label>
          </div>

          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            rows={3}
            className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Describe what kind of hint you need..."
          />
        </div>

        {/* API Key Toggle */}
        <div className="space-y-2 border border-gray-800 p-3 rounded-md bg-gray-800">
          <div
            className="flex justify-between items-center cursor-pointer select-none"
            onClick={() => setShowApiKeyInput((prev) => !prev)}
          >
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-300">
                Change API Key
              </span>
            </div>
            {showApiKeyInput ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>

          {showApiKeyInput && (
            <div className="mt-3 space-y-2">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-400 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Gemini API key"
              />
              <button
                onClick={handleApiKeySave}
                className="w-full text-sm font-semibold py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition"
              >
                Save API Key
              </button>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleClick}
          disabled={loading}
          className="cursor-pointer w-full rounded-lg bg-blue-900 hover:from-blue-300 hover:to-blue-900 text-white text-sm font-medium py-2.5 px-4 shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <div className="flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Get Hint</span>
              </>
            )}
          </div>
        </button>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 border border-gray-700 mb-3">
              <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
            </div>
            <p className="text-xs text-gray-400">AI is thinking...</p>
          </div>
        )}

        {/* Hint Display */}
        {hint && !loading && (
          <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-gray-300">
                AI Response
              </span>
            </div>
            <div className="rounded-lg bg-gray-800 border border-gray-700 p-3 hover:border-gray-600 transition-colors duration-200">
              <pre className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed font-mono">
                {hint}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-gray-800 bg-gray-800/50">
        <div className="flex items-center justify-center gap-1">
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Powered by Gemini</span>
          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500" />
        </div>
      </div>
    </div>
  );
};

export default HintScreen;
