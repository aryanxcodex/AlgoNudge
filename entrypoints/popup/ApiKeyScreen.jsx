const ApiKeyScreen = ({ apiKey, setApiKey, saveKey }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          🔐 LeetBuddy Setup
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Enter your Gemini API key to start getting subtle coding hints.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="api-key"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Gemini API Key
        </label>
        <input
          id="api-key"
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-abc123..."
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={saveKey}
          className="mt-2 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 transition-colors"
        >
          Save API Key
        </button>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        We don’t store your key. It stays in your browser’s local storage.
      </div>
    </div>
  );
};

export default ApiKeyScreen;
