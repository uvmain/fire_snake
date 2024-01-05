function replaceSelectedText(message) {
  const input = document.activeElement;

  if (input && ['textarea', 'input'].includes(input.tagName.toLowerCase())) {
    input.value = message.convertedText;

    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  } else {
    let selection = window.getSelection();
    
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const textNode = document.createTextNode(message.convertedText);
      range.insertNode(textNode);

      const event = new Event('input', { bubbles: true });
      textNode.parentElement.dispatchEvent(event);
    } else {
      console.log('Input not found');
    }
  }
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "replaceText") {
    replaceSelectedText(message);
  }
});