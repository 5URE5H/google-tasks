import { FunctionComponent } from "react";
import { GoogleLogout } from "react-google-login";

interface LogoutProps {}

const clientId =
  "319564862813-vf3urpmn294m54rc5hdvl2qn6dmo80i5.apps.googleusercontent.com";

const Logout: FunctionComponent<LogoutProps> = () => {
  const onSuccess = () => {
    console.log("success");
  };

  return (
    <div id="singInButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
};

export default Logout;
