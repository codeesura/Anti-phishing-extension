import React, { useState, useEffect } from "react";
import {
  CloseImage,
  IconMoonImage,
  IconDaySunnyImage,
  IconFireImage,
  IconSafeImage,
  LogoImage,
} from "./components/ImagesImport";
import {
  DesktopContainer,
  SearchContainer,
  InputBar,
  CloseIcon,
  ToggleThemeIcon,
  LogoAndTextWrapper,
  MainLogo,
  StatusLogo,
  WarningMessage,
  InlineWarningText,
  InformationText,
  InlineCautionText,
  StyledText,
} from "./components/StyledComponenys";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function WebsiteSafetyChecker() {
  const [inputText, setInputText] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [statusIndicatorLogo, setStatusIndicatorLogo] = useState(null);
  const [informationText, setInformationText] = useState("");

  const lightThemeColor = "rgba(234, 234, 234, 1)";
  const darkThemeColor = "rgba(24, 24, 24, 1)";

  const lightRectangleColor = "rgba(217, 217, 217, 1)";
  const darkRectangleColor = "rgba(28, 27, 31, 1)";

  const lightTextColor = "black";
  const darkTextColor = "white";

  useEffect(() => {
    // searchText değiştiğinde CloseIcon bileşenini gösterip gizle
  }, [inputText]);

  const parseHostname = (url) => {
    let hostname;
    if (url.indexOf("://") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }
    hostname = hostname.startsWith("www.") ? hostname.slice(4) : hostname;
    hostname = hostname.split(":")[0];
    hostname = hostname.split("?")[0];
    return hostname;
  };

  const constructPhishingCheckURL = (hostname) => {
    const domainParts = hostname.split(".");
    const domainType = domainParts.pop();
    const mainDomain = domainParts.pop();
    const firstTwoLetters = mainDomain.slice(0, 2).toLowerCase();
    const lengthCategory = hostname.length;
    return `https://raw.githubusercontent.com/codeesura/Anti-phishing-extension/main/filter/${domainType}/${firstTwoLetters}/${lengthCategory}.json`;
  };

  const checkWebsiteSafety = async (inputUrl) => {
    if (!inputUrl) {
      return;
    }
    let parsedUrl;
    try {
      const fullUrl = inputUrl.startsWith("http")
        ? inputUrl
        : "http://" + inputUrl;
      parsedUrl = new URL(fullUrl);
    } catch (error) {
      console.warn("Invalid URL!");
      setInformationText("Please enter a valid URL.");
      return;
    }
    const domainRegex = /.(?=[^.]+$)/;
    if (!domainRegex.test(parsedUrl.hostname)) {
      console.warn("URL lacks a domain extension!");
      return;
    }

    const hostname = parseHostname(inputUrl);
    const phishingCheckURL = constructPhishingCheckURL(hostname);

    try {
      const response = await fetch(phishingCheckURL);

      if (response.status === 404) {
        console.error("Fetch request failed with status:", response.status);
        throw new Error("WebsiteNotInBlacklist");
      }

      if (!response.ok) {
        throw new Error("Other fetch error");
      }

      const responseData = await response.json();
      if (responseData.includes(hostname)) {
        setInformationText(
          <>
            <WarningMessage>Alert: {hostname} is UNSAFE!</WarningMessage>
            <InformationText>
              This is a phishing website. Connecting your wallet, approving
              transactions, or providing signatures puts
              <InlineWarningText>
                {" "}
                your funds at immediate risk.
              </InlineWarningText>
              Exercise extreme caution!
            </InformationText>
          </>
        );

        setStatusIndicatorLogo(IconFireImage); // Phishing StatusLogo
      } else {
        setInformationText(
          hostname +
            " is not on our blacklist, but always proceed with caution. The absence from a blacklist does not guarantee safety."
        );
        setStatusIndicatorLogo(IconSafeImage); // Safe StatusLogo
      }
    } catch (error) {
      console.error("Error:", error.message);
      setInformationText(
        <>
          <InformationText>
            {hostname} is not on our blacklist, but always{" "}
            <InlineCautionText>proceed with caution</InlineCautionText>. The
            absence from a blacklist does not guarantee safety.
          </InformationText>
        </>
      );

      setStatusIndicatorLogo(IconSafeImage); // Safe StatusLogo
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      checkWebsiteSafety(inputText);
    }
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <DesktopContainer
        style={{
          backgroundColor: isDarkMode ? darkThemeColor : lightThemeColor,
        }}
      >
        <MainLogo src={LogoImage} alt="App Logo" />
        <SearchContainer
          style={{
            backgroundColor: isDarkMode
              ? darkRectangleColor
              : lightRectangleColor,
          }}
        >
          <InputBar
            type="text"
            placeholder="Search Domain..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              backgroundColor: isDarkMode
                ? darkRectangleColor
                : lightRectangleColor,
              color: isDarkMode ? darkTextColor : lightTextColor,
            }}
            onKeyDown={handleInputKeyDown}
          />
          {inputText && (
            <CloseIcon
              src={CloseImage}
              loading="lazy"
              alt="Close Icon"
              onClick={() => setInputText("")}
            />
          )}
        </SearchContainer>
        <LogoAndTextWrapper>
          {statusIndicatorLogo && (
            <StatusLogo src={statusIndicatorLogo} alt="Status Logo" />
          )}
          {informationText && <StyledText>{informationText}</StyledText>}
        </LogoAndTextWrapper>
        <ToggleThemeIcon
          src={isDarkMode ? IconDaySunnyImage : IconMoonImage}
          loading="lazy"
          alt="Theme Toggle Icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
        />
      </DesktopContainer>
    </ThemeProvider>
  );
}

export default WebsiteSafetyChecker;
