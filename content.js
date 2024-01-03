function replaceSelectedText(message) {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(message.convertedText));
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "replaceText") {
    replaceSelectedText(message);
  }
});