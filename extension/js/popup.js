document.addEventListener('DOMContentLoaded', function () {
    var toggleBtn = document.getElementById('toggleBtn');

    // Check the initial state of the extension
    chrome.storage.sync.get({enabled: true}, function(data) {
        updateButton(data.enabled);
    });

    toggleBtn.addEventListener('click', function () {
        chrome.storage.sync.get({enabled: true}, function(data) {
            var newStatus = !data.enabled; // Reverse the status
            chrome.storage.sync.set({enabled: newStatus}, function() {
                updateButton(newStatus);
            });
        });
    });

    function updateButton(enabled) {
        toggleBtn.textContent = enabled ? 'Active' : 'Inactive'; // Update the text
        toggleBtn.className = enabled ? 'enabled' : 'disabled';
    }


    // Show the website counts
    chrome.storage.local.get({totalWebsiteCount: 0, dangerousWebsiteCount: 0}, function(data) {
        document.getElementById('totalWebsiteCount').textContent = `Total websites visited: ${data.totalWebsiteCount}`;
        document.getElementById('dangerousWebsiteCount').textContent = `Dangerous websites encountered: ${data.dangerousWebsiteCount}`;
    });
});