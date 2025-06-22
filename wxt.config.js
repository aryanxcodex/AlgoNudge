import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: () => ({
    plugins: [react(), tailwindcss()],
  }),
  manifest: {
    web_accessible_resources: [
      {
        matches: ["*://leetcode.com/*"],
        resources: ["icon/*.png"],
      },
    ],
    permissions: ["storage", "tabs"],
  },
  devServer: {
    port: 5175,
  },
});
