import Logo from "../assets/images/logo.png";

export default function TaskWelcome() {
  return (
    <div className="custom-ripple-container">
      <div className="custom-ripple"></div>
      <img src={Logo} alt="Tasks" />
    </div>
  );
}
