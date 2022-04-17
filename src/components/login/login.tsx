import { FunctionComponent } from "react";
import { GoogleLogin } from "react-google-login";

interface LoginProps {}

const clientId = "319564862813-vf3urpmn294m54rc5hdvl2qn6dmo80i5.apps.googleusercontent.com";

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
        clientId={clientId}
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
