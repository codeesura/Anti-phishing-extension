import { styled } from "@mui/material/styles";

const DesktopContainer = styled("div")({
  backgroundColor: `rgba(24, 24, 24, 1)`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  alignItems: `center`,
  width: `100%`,
  height: `100vh`,
  padding: `0px`,
  boxSizing: `border-box`,
  overflow: `hidden`,
  transition: "background-color 0.1s",
});

const SearchContainer = styled("div")({
  position: "relative",
  borderRadius: `14px`,
  width: `55%`,
  height: `3%`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `10px`,
  marginBottom: `20px`,
  marginTop: "-45vh",
});

const InputBar = styled("input")({
  backgroundColor: `rgba(28, 27, 31, 1)`,
  color: `white`,
  border: `none`,
  width: `100%`,
  height: `100%`,
  outline: `none`,
});

const CloseIcon = styled("img")({
  height: `24px`,
  width: `24px`,
  position: `absolute`,
  right: `2%`,
  top: `50%`,
  transform: "translateY(-50%)",
  cursor: "pointer",
});

const ToggleThemeIcon = styled("img")({
  height: `26.02px`,
  width: `25.98px`,
  position: `absolute`,
  right: `5%`,
  top: `5%`,
  cursor: "pointer",
});

const LogoAndTextWrapper = styled("div")(({ theme }) => ({
  height: "15%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: theme.spacing(6),
  maxWidth: "50%", // Maksimum genişliği sınırlar
  marginLeft: "auto", // Sağa yaslamak için
  marginRight: "auto", // Sağa yaslamak için

  [theme.breakpoints.down("sm")]: {
    maxWidth: "65%", // Küçük ekranlarda maksimum genişlik
  },
}));

const MainLogo = styled("img")({
  position: "absolute",
  left: "3%",
  top: "3%",
  height: "50px", // Logo'nuzun boyutunu ayarlayın
  width: "50px", // Logo'nuzun boyutunu ayarlayın
});

const StatusLogo = styled("img")(({ theme }) => ({
  marginRight: "10px", // Logo ve yazı arasındaki boşluğu ayarlar
  width: "15vw", // Ekran genişliğinin %5'i kadar
  height: "15vw",
  maxWidth: "238px",
  maxHeight: "238px",
}));

const WarningMessage = styled("p")(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "bold",
  color: theme.palette.mode === "dark" ? "#F90316" : "#8B0000",
  margin: "0",
  padding: "0",
}));

const InlineWarningText = styled("span")(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#E20d1d" : "#000000",
  fontWeight: "bold",
  fontSize: "larger",
}));

const InformationText = styled("p")(({ theme }) => ({
  fontSize: "18px",
  fontFamily: "'Roboto', sans-serif", // Roboto fontunu kullandık. Alternatif olarak 'Open Sans' da kullanabilirsiniz.
  fontWeight: "400",
  lineHeight: "1.5", // Satır yüksekliği arttırıldı
  letterSpacing: "0.5px", // Karakter aralığı ekleniyor
  color: theme.palette.mode === "dark" ? "#B0B0B0" : "#707070",
  margin: "10px 0",
  padding: "0",
}));

const InlineCautionText = styled("span")(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#505050" : "#303030",
  fontWeight: "500", // Kalınlığı arttırılarak dikkat çekici hale getirildi
  fontSize: "inherit", // Ana metin boyutunu miras alıyor
  letterSpacing: "0.5px", // Karakter aralığı ekleniyor
}));

const StyledText = styled("p")(({ theme }) => ({
  color: `white`,
  marginTop: theme.spacing(2),
  fontSize: theme.typography.pxToRem(16),
}));

export {
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
  StyledText
};
