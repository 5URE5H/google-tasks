import { FunctionComponent } from "react";
import { GoogleLogin } from "react-google-login";
import { CLIENT_ID } from "../../config";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const onSuccess = (res: any) => {
    console.log("success", res);
  };

  const onFailure = (res: any) => {
    console.log("failure", res);
  };

  return (
    <div id="singInButton">
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      ></GoogleLogin>
    </div>
  );
};

export default Login;
