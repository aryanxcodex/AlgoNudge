import { motion } from "framer-motion";
import { useState } from "react";
import { FaKey, FaRobot } from "react-icons/fa";
import { toast } from "sonner";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const ApiKeyScreen = ({ apiKey, setApiKey, saveKey }) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key.");
      return;
    }

    saveKey();
    setSaved(true);
    toast.success("API key saved!");
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={fadeIn}
      transition={{ duration: 0.4 }}
      className="p-5 min-w-[300px] max-w-[380px] bg-white dark:bg-[#1c1c1e] rounded-xl shadow-md flex flex-col gap-6"
    >
      {/* Extension Title */}
      <div className="flex items-center gap-2">
        <FaRobot className="text-blue-600 text-xl" />
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          AlgoNudge
        </h1>
      </div>

      <hr className="border-t border-gray-200 dark:border-gray-700" />

      {/* Prompt Header */}
      <div className="flex items-center gap-3">
        <FaKey className="text-blue-500 text-lg" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Set up Gemini API
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Paste your key to start getting subtle coding hints.
          </p>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-3"
      >
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
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-3 py-2 text-sm shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          onClick={handleSave}
          className="cursor-pointer w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 transition"
        >
          {saved ? "✅ Saved!" : "Save API Key"}
        </motion.button>
      </motion.div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
        This key stays in your browser only — never sent anywhere else.
      </p>
    </motion.div>
  );
};

export default ApiKeyScreen;
