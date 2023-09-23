let isEnabled = true;  // Default true

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({enabled: true}, function() {
        console.log("The extension is enabled.");
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "toggleEnabled") {
            chrome.storage.sync.get('enabled', function(data) {
                var newStatus = !data.enabled;
                chrome.storage.sync.set({enabled: newStatus}, function() {
                    isEnabled = newStatus;
                    sendResponse({status: newStatus});
                });
            });
            return true;  // Will respond asynchronously.
        }
    }
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (!isEnabled) {
            return {cancel: true};
        }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);

chrome.storage.sync.get('enabled', function(data) {
    isEnabled = data.enabled;
});
