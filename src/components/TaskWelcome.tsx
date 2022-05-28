import Logo from "../assets/images/logo.png";
import { useThemeSwitch } from "../store/ThemeSwitch.store";

export default function TaskWelcome() {
  const [themeState] = useThemeSwitch();

  return (
    <div
      className={`custom-ripple-container ${
        themeState.isDarkMode ? "custom-ripple-dark" : ""
      }`}
    >
      <div className="custom-ripple"></div>
      <img src={Logo} alt="Tasks" />
    </div>
  );
}
