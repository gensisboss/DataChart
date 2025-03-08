
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'VALUE_CHANGE' && devToolsConnection) {
    devToolsConnection.postMessage({
      type: 'UPDATE_CHART',
      data: message
    });
  }
})

chrome.runtime.onConnect.addListener(port => {
  if (port.name === "dataChart") {
    devToolsConnection = port;
    port.onDisconnect.addListener(() => {
      devToolsConnection = null;
    });
  }
})