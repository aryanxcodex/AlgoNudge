import { defineConfig, defineWebExtConfig } from "wxt";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: () => ({
    plugins: [react(), tailwindcss()],
  }),
  manifest: {
    manifest_version: 3,
    action: {
      default_icon: {
        16: "icon/16.png",
        32: "icon/32.png",
        48: "icon/48.png",
        128: "icon/128.png",
      },
    },
    permissions: ["storage", "tabs"],
    background: {
      service_worker: "/background.js",
    },
    side_panel: {
      default_path: "/sidepanel/index.html",
    },
    web_accessible_resources: [
      {
        matches: ["*://leetcode.com/*"],
        resources: ["icon/*.png"],
      },
    ],
  },
  sidePanel: {
    entry: "/sidepanel/index.html",
  },
  background: {
    entry: "/background/index.js",
  },
  devServer: {
    port: 5175,
  },
  webExt: defineWebExtConfig({
    binaries: {
      firefox: "/home/aryan/firefox/firefox",
    },
    chromiumArgs: ["--user-data-dir=./.wxt/chrome-data"],
  }),
});
