// @ts-check

const id = "chromeExtSteamPriceHistory";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id,
    title: "価格の履歴を見る",
    contexts: ["page"],
    documentUrlPatterns: ["https://store.steampowered.com/app/*"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === id) {
    const regexp = /^https:\/\/store.steampowered.com\/app\/(?<gameId>\d+)\//;
    const gameId = info.pageUrl.match(regexp)?.groups?.gameId;

    if (gameId) {
      const url = `https://steamdb.info/app/${gameId}/#pricehistory`;
      chrome.tabs.create({ url });
    }
  }
});
