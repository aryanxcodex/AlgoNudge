export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});