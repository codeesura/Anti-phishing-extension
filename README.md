# Anti-Phishing Extension

This repository contains a Google Chrome Extension developed to protect users from potential phishing attacks. With this Extension, users can easily check the safety of the websites they visit.

## Table of Contents

1. [Features](#features)
2. [Directory Structure](#directory-structure)
3. [Installation](#installation)
   - [From Google Web Store](#from-google-web-store)
   - [Manually](#manually)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)
7. [Contact](#contact)

## Features

- **Real-Time Website Scanning**: The Extension scans the websites visited by the user in real-time.
- **Blacklist Checking**: Visited sites are checked against an updated blacklist.
- **Alert System**: The user receives immediate alerts if the visited site is on the blacklist.

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
