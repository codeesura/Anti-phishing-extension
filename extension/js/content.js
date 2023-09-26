// Declare a variable to store the website set
let websiteSet;

// Define an asynchronous function to fetch data
async function fetchData() {
    // Get the hostname of the current window
    const hostname = window.location.hostname;

    // Try to get the cached result for the hostname
    const cachedResult = localStorage.getItem(hostname);

    // If the cached result is "safe", return immediately
    if (cachedResult === "safe") {
        return;
    }
    
    // Increase the total website count
    chrome.storage.local.get({totalWebsiteCount: 0}, function(data) {
        data.totalWebsiteCount++;
        chrome.storage.local.set({totalWebsiteCount: data.totalWebsiteCount});
    });


    try {
        // Log the hostname for debugging purposes
        console.log("Hostname : ", hostname);

        // Split the hostname into its parts
        const domainParts = hostname.split('.');

        // Get the domain type (e.g., .com, .net, .org, etc.)
        const domainType = domainParts.pop();

        // Get the main domain (e.g., www.example.com)
        const mainDomain = domainParts.pop();

        // Get the first two letters of the main domain
        const firstTwoLetters = mainDomain.slice(0, 2).toLowerCase();

        // Get the length of the hostname
        const lengthCategory = hostname.length;

        // Construct the URL to fetch the data from
        const url = `https://raw.githubusercontent.com/codeesura/Anti-phishing-extension/main/filter/${domainType}/${firstTwoLetters}/${lengthCategory}.json`;

        // Fetch the data from the URL
        const data = await fetch(url).then(res => {
            // If the response status is 404, throw an error
            if (res.status === 404) {
                console.error("Fetch request failed with status:", res.status);
                throw new Error("WebsiteNotInBlacklist");
            }

            // If the response is not ok, throw an error
            if (!res.ok) {
                throw new Error("Other fetch error");
            }

            // Otherwise, return the JSON data from the response
            return res.json();
        });

        // Create a new set from the data
        websiteSet = new Set(data);

        // Check the current website
        checkCurrentWebsite(websiteSet);
    } catch (error) {
        // If the error message is "WebsiteNotInBlacklist", log a message and add the hostname to the cache as safe
        if (error.message === "WebsiteNotInBlacklist") {
            console.log('Website not found in the blacklist, marking as safe.');
            addToCacheSafe(window.location.hostname);
        } else {
            // Otherwise, log the error
            console.error('Error fetching data:', error);
        }
    }
}

// Define a function to check the current website
function checkCurrentWebsite(websiteSet) {
    // Get the hostname of the current window
    const hostname = window.location.hostname;

    // If the website set contains the hostname, increase the dangerous website count
    if (websiteSet.has(hostname)) {
        chrome.storage.local.get({dangerousWebsiteCount: 0}, function(data) {
            data.dangerousWebsiteCount++;
            chrome.storage.local.set({dangerousWebsiteCount: data.dangerousWebsiteCount});
        });
        showWarning();
    } else {
        // Otherwise, log a message and add the hostname to the cache as safe
        console.log("Safe site detected, adding to cache."); // For debug
        addToCacheSafe(hostname);
    }
}

// Define a function to add a domain to the cache as safe
function addToCacheSafe(domain) {
    const cachedValue = localStorage.getItem(domain);
    if (cachedValue === "safe") {
        console.log(domain, "is already marked as safe in cache.");
        return;
    }
    // Log a message for debugging purposes
    console.log("Adding", domain, "to cache as safe.");

    // Add the domain to the local storage as safe
    localStorage.setItem(domain, "safe");
}

// Define a function to show a warning
function showWarning() {
    // Create a warning div and a wallet warning div
    const warningDiv = createWarningDiv();
    const walletWarning = createWalletWarningDiv();

    // Create a div for the "Anti Phishing" text
    const antiPhishingDiv = document.createElement('div');
    antiPhishingDiv.style.position = 'absolute';
    antiPhishingDiv.style.right = '10px';
    antiPhishingDiv.style.bottom = '10px';
    antiPhishingDiv.style.color = '#FFFFFF';
    antiPhishingDiv.style.fontSize = '0.5em';
    antiPhishingDiv.innerText = 'Anti Phishing';

    // Append the wallet warning div and the "Anti Phishing" div to the warning div
    warningDiv.appendChild(walletWarning);
    warningDiv.appendChild(antiPhishingDiv);

    // Append the warning div to the document body
    document.body.appendChild(warningDiv);

    // Send a message to the Chrome runtime to show the warning
    chrome.runtime.sendMessage({ command: "showWarning" });
}

// Define a function to create a warning div
function createWarningDiv() {
    // Create a div element for the warning
    const warningDiv = document.createElement('div');

    // Apply styles to the warning div
    Object.assign(warningDiv.style, getWarningStyles());

    // Set the inner HTML of the warning div
    warningDiv.innerHTML = `
        <div style="position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
            <img src="${chrome.runtime.getURL("./images/icons/fire.png")}" style=""><br>
            <strong style="font-size: 2em; color: white;">Anti Phishing</strong><br>
            <div style="font-size: 1.2em; color: white;">Warning! It is recommended not to enter this website.</div>
            <div style="font-size: 0.7em; color: #ffb61c;">If you connect your wallet and give a signature or approval, you will lose your funds!!</div>
        </div>
        <img src="${chrome.runtime.getURL("./images/icons/backlogo.png")}" style="position: absolute; top: 20px; left: 20px;">
    `;

    return warningDiv;
}

// Define a function to create a wallet warning div
function createWalletWarningDiv() {
    // Create a div element for the wallet warning
    const walletWarning = document.createElement('div');

    // Apply styles to the wallet warning div
    walletWarning.style.fontSize = '1.2em';
    walletWarning.style.color = '#FFFF00';
    walletWarning.style.position = 'absolute';
    walletWarning.style.bottom = '50px';
    walletWarning.style.width = '100%';
    walletWarning.style.textAlign = 'center';

    return walletWarning;
}

// Define a function to get the styles for the warning div
function getWarningStyles() {
    // Return an object containing the styles for the warning div
    return {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        padding: '50px 30px',
        backgroundColor: 'rgba(162,13,13,0.95)',
        color: '#FFFFFF',
        zIndex: '10000',
        textAlign: 'center',
        boxShadow: '0 0 20px rgba(0,0,0,0.7)',
        fontSize: '1.5em',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.5'
    };
}


// Call the fetchData function to start fetching data if the extension is enabled
chrome.storage.sync.get({enabled: true}, function(data) {
    if (data.enabled) {
        fetchData().catch(error => console.error('Error fetching data:', error));
    }
});