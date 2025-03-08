// 接收来自后台的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'getVariables') {
		// 这里假设你要获取全局变量，实际可能需要遍历window对象或使用其他方法  
		const variables = Object.keys(window).filter(key => typeof window[key] !== 'function');
		sendResponse({ variables });
	}
	// 注意：由于异步性质，return true 表示你将在稍后发送响应  
	return true;
});

// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground(message) {
	chrome.runtime.sendMessage({ greeting: message || '你好，我是content-script呀，我主动发消息给后台！' }, function (response) {
	});
}

window.addEventListener("message", function (e) {
	chrome.runtime.sendMessage({
		type: 'VALUE_CHANGE',
		value: e.data
	})
}, false);




