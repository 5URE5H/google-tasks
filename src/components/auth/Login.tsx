import { FunctionComponent } from "react";
import { GoogleLogin } from "react-google-login";
import { CLIENT_ID, SCOPES } from "../../config";
import Welcome from "../../assets/svg/warm-welcome.svg";
import Typography from "@mui/material/Typography";
import { useUserSession } from "../../store/User.store";
import {
  APP_LOADED,
  UPDATE_USER_INFO,
  USER_SIGNED_IN,
} from "../../store/constants";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const [state, dispatch] = useUserSession();

  const onSuccess = (res: any) => {
    console.log(res);
    dispatch({ type: USER_SIGNED_IN });
    dispatch({ type: UPDATE_USER_INFO, payload: res.profileObj });
  };

  const onFailure = (res: any) => {
    console.log("failure", res);
  };

  return (
    <div className="custom-welcome-container">
      <img src={Welcome} alt="welcome" width="25%" />
      <Typography variant="h4" gutterBottom component="div">
        Welcome to Tasks
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        style={{ color: "gray" }}
      >
        Keep track of important things that you need to get done in one place.
      </Typography>
      <div id="singInButton">
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          scope={SCOPES[0]}
          isSignedIn={true}
        ></GoogleLogin>
      </div>
    </div>
  );
};

export default Login;
