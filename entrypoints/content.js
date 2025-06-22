export default defineContentScript({
  matches: ["*://leetcode.com/problems/*"],
  main() {
    console.log("📌 LeetBuddy content script loaded");

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "GET_LEETCODE_CODE") {
        try {
          // Get the code (from textarea or editor)
          const monacoEditor = document.querySelector(".monaco-editor");
          const codeLines = monacoEditor?.querySelectorAll(".view-lines > div");
          const code = Array.from(codeLines || [])
            .map((line) => line.innerText)
            .join("\n");

          // Get the title
          const titleElement = document.querySelector(
            'a[href^="/problems/"].no-underline'
          );
          const title = titleElement
            ? titleElement.innerText.trim()
            : "Unknown Title";

          // Get the description
          const descriptionElement = document.querySelector(
            '[data-track-load="description_content"]'
          );
          const description = descriptionElement
            ? descriptionElement.innerText.trim()
            : "No description found.";

          sendResponse({ code, title, description });
        } catch (err) {
          console.error("❌ Failed to scrape LeetCode content:", err);
          sendResponse({ error: "Failed to scrape page data." });
        }
        return true; // Allow async response
      }
    });
  },
});
