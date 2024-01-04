function replaceSelectedText(message) {
  let selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(message.convertedText);
    range.insertNode(textNode);
  }
  else {
    // if the selected text is in an input, the range will be less than one so we need to
    const input = document.activeElement;
    console.log(document.activeElement)
    if (input && ['textarea', 'input'].includes(input.tagName.toLowerCase())) {
      input.value = message.convertedText; 
    }
    else {
      console.log('Input not found')
    }
  }

}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "replaceText") {
    replaceSelectedText(message);
  }
});