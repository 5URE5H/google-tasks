import { useEffect } from "react";
import "./App.css";
import TaskBody from "./components/TaskBody";
import { UserProvider } from "./store/User.store";
import { gapi } from "gapi-script";
import Login from "./components/login/login";
import Logout from "./components/login/logout";

const clientId =
  "319564862813-vf3urpmn294m54rc5hdvl2qn6dmo80i5.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  return (
    <div className="App">
      <Login />
      <Logout />
    </div>
  );
}

export default App;
