browser.contextMenus.create({
  id: "convert_to_snake_case",
  title: "Convert to snake_case",
  contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convert_to_snake_case") {
    const convertedText = info.selectionText.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    browser.tabs.sendMessage(tab.id, { action: "replaceText", convertedText });
  }
});