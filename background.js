browser.contextMenus.create({
  id: "convert_to_snake_case",
  title: "Convert to snake_case",
  contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convert_to_snake_case") {
    let convertedText = info.selectionText.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s+/g, '_').toLowerCase();
    // remove non-aplha-numeric characters
    convertedText = convertedText.replace(/[^a-zA-Z0-9_](?=_)/g, '').replace(/,/g, '_');
    browser.tabs.sendMessage(tab.id, { action: "replaceText", convertedText });
  }
});