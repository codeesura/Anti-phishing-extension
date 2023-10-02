# Anti-Phishing Extension

This repository contains the [Anti-Phishing](https://chrome.google.com/webstore/detail/anti-phishing/npipcajipdkafdkellochifbfmppdalo) Google Chrome Extension developed to protect users from potential phishing attacks. With the Anti-Phishing Extension, users can easily check the safety of the websites they visit.

## Table of Contents

1. [Features](#features)
2. [Extension Overview](#extension-overview)
3. [Directory Structure](#directory-structure)
4. [Installation](#installation)
   - [From Google Web Store](#from-google-web-store)
   - [Manually](#manually)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Features

- **Real-Time Website Scanning**: The Extension scans the websites visited by the user in real-time.
- **Blacklist Checking**: Visited sites are checked against an updated blacklist.
- **Alert System**: The user receives immediate alerts if the visited site is on the blacklist.

## Extension Overview

The Anti-Phishing Extension is designed to serve as a primary defense line against malicious phishing websites for users. Incorporating a mix of real-time website scanning and an updated blacklist check, the extension strives to provide a seamless and secure browsing experience.

### How it Works

1. **Real-Time Scanning:** 
   - Once a webpage is accessed, the extension immediately begins its scanning process in the background.
   - It evaluates the structure of the website, domain details, and other metadata to determine its authenticity.

2. **Blacklist Verification:**
   - The URL of the visited website is cross-referenced with an extensive blacklist database.
   - If a match is found, it signifies that the website has been previously identified as harmful or suspicious.

3. **User Notification and Blockage:**
   - Should the website be flagged as suspicious, an overlay alert system is activated. This overlay will cover the entire website, preventing the user from interacting with potentially harmful content.
   - This ensures that users do not accidentally engage in potentially harmful activities, such as interacting with fake crypto wallets or entering sensitive information like credit card details.

   ![Overlay Alert Image](https://github.com/codeesura/Anti-phishing-extension/assets/120671243/df56b3e3-096b-4b8a-bdd6-4d7ab4196e7f)
   
4. **Active/Inactive Toggle:**
   - The extension comes with a toggle button allowing users to activate or deactivate its functionality as per their needs.
   - By toggling the extension to the inactive state, it will cease its scanning and alert processes until reactivated.

   ![Toggle Button Image](https://github.com/codeesura/Anti-phishing-extension/assets/120671243/69dc265d-9297-44cf-91e2-06e98a17ee26)

## Directory Structure

- `filter/`: This directory contains the logic for filtering the domains in the blacklist, considering different domain extensions, the first two characters, and the total length of the domain.
- `website/`: This directory holds the source code for the anti-phishing website.
- `extension/`: This directory contains the source code for the Chrome extension.

## Installation

### From Google Web Store

1. You can download and install the Extension from the Google Web Store [Anti Phishing](https://chrome.google.com/webstore/detail/anti-phishing/npipcajipdkafdkellochifbfmppdalo).

### Manually

1. Clone the repository to your local machine.
   ```sh
   git clone https://github.com/codeesura/Anti-phishing-extension.git
   ```
2. Open `chrome://extensions/` page in your Chrome browser.
3. Enable "Developer mode" in the top right corner.
4. Click on "Load unpacked" and select the `extension/` directory from the cloned repository.
5. The Extension should now be installed and active in your browser.

## Usage

Once the Extension is successfully installed, it will be active in your browser. The websites you visit will be automatically scanned, and you will receive alerts if a website is on the blacklist.

## Contributing

If you'd like to contribute to the project, please follow the steps below:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions about our project, you can reach us at: [codeesura@gmail.com](mailto:codeesura@gmail.com)
