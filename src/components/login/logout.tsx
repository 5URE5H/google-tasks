import { FunctionComponent } from "react";
import { GoogleLogout } from "react-google-login";
import { CLIENT_ID } from "../../config";

interface LogoutProps {}

const Logout: FunctionComponent<LogoutProps> = () => {
  const onSuccess = () => {
    console.log("success");
  };

  return (
    <div id="singInButton">
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
};

export default Logout;
