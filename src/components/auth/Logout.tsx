import { FunctionComponent } from "react";
import { GoogleLogout } from "react-google-login";
import { CLIENT_ID } from "../../config";
import { USER_SIGNED_OUT } from "../../store/constants";
import { useUserSession } from "../../store/User.store";

interface LogoutProps {}

const Logout: FunctionComponent<LogoutProps> = () => {
  const [state, dispatch] = useUserSession();

  const onSuccess = () => {
    dispatch({ type: USER_SIGNED_OUT });
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
