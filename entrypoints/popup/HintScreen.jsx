import { useState } from "react";
import { Loader2, Sparkles, Brain, MessageSquare, Zap } from "lucide-react";

const HintScreen = ({ onGetHint, hint, loading, setUserPrompt, userPrompt }) => {

  const handleClick = () => {
    onGetHint(userPrompt);
  };

  return (
    <div className="w-full max-w-sm bg-gray-900 text-white">
      {/* Header Section */}
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

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Prompt Input */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-800" />
            <label className="text-sm font-medium text-gray-300">
              Your Prompt
            </label>
          </div>

          <div className="relative group">
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              rows={3}
              className="w-full rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-600"
              placeholder="Describe what kind of hint you need..."
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClick}
          disabled={loading}
          className="cursor-pointer w-full rounded-lg bg-blue-900 hover:from-blue-300 hover:to-blue-900 text-white text-sm font-medium py-2.5 px-4 shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <div className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 transform transition-transform duration-200 group-hover:rotate-12" />
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

        {/* Hint Output */}
        {hint && !loading && (
          <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-gray-300">
                AI Response
              </span>
            </div>

            <div className="relative group">
              <div className="rounded-lg bg-gray-800 border border-gray-700 p-3 hover:border-gray-600 transition-colors duration-200">
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
                <pre className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed font-mono">
                  {hint}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-gray-800 bg-gray-800/50">
        <div className="flex items-center justify-center gap-1">
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Powered by AI</span>
          <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500" />
        </div>
      </div>
    </div>
  );
};

export default HintScreen;
